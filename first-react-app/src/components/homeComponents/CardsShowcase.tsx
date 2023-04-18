import { lastFM, NewArtistInfo } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import note from "../../assets/note.png";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../data/reduxStore";
import { ArtistInfo, getArtistByName } from "../../data/artistDataSlice";

function Cards(props: { searchValue: string }) {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentCard, setCurrentCard] = useState<JSX.Element>();

  const cardsStore = useSelector((state: RootState) => state.cardsInStore.cards);
  const artistsStore = useSelector((state: RootState) => state.artistsInStore.artists);
  const dispatch = useDispatch<AppDispatch>();

  //don't touch
/*   async function getArtistPictures(artists: NewArtistInfo) {
    for (const artist of artists) {
      const trimmedName = artist.name.replace(/\s+/g, "");
      const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=967b0e577e1c06b79eeb679cb791b1ec&tags=${trimmedName}&extras=url_l&format=json&nojsoncallback=1`;
      const result = await fetch(url);
      const artistPicture = await result.json();
      if (artistPicture.photos.photo.length === 0) {
        artist.image = note;
      } else {
        artist.image =
          artistPicture.photos.photo[
            Math.floor(Math.random() * artistPicture.photos.photo.length)
          ].url_l;
        if (artist.image === undefined) {
          artistPicture.photos.photo[Math.floor(Math.random() * artistPicture.photos.photo.length)]
            .url_l;
        }
      }
    }
    return artists;
  } */

  async function addArtistDataToArray() {
    const artistInfo: JSX.Element[] = [];
    if (props.searchValue) setLoading(1);
    /* const data = await lastFM.getArtist(props.searchValue); */

    const data = await dispatch(getArtistByName(props.searchValue));
    console.log(data);
    console.log(store.getState());
    console.log(artistsStore);
    if (data === null) {
      setCards(null);
      setLoading(0);
      return;
    }
    if (data.length === 0) {
      setCards(null);
      setLoading(2);
      return;
    }
    /* const dataWithImages = await getArtistPictures(artistsStore); */
    let count = 1;
    for (const artists of artistsStore) {
      artistInfo.push(
        <Card
          handleCardClick={displayModalWindow}
          key={count}
          songArtist={artists.name}
          songImage={artists.image}
        ></Card>
      );
      count++;
    }
    setCards(artistInfo);
    setLoading(0);
  }

  async function getArtistInfo(artist: string) {
    const artistData = await lastFM.getArtistInfo(artist);
    return artistData;
  }

  async function addDataToModalWindow() {
    const data = await getArtistInfo(currentArtist);
    const modalCard = (
      <ModalCard
        handleModalClose={closeModalWindow}
        name={data!.name}
        similar={data!.similar}
        tags={data!.tags}
        bio={{
          published: data!.published,
          summary: data!.summary,
        }}
      ></ModalCard>
    );
    setCurrentCard(modalCard);
  }

  useEffect(() => {
    addArtistDataToArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchValue]);

  useEffect(() => {
    if (isModalActive) {
      addDataToModalWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalActive, currentArtist]);

  function displayModalWindow(artist: string) {
    setIsModalActive(true);
    setCurrentArtist(artist);
  }

  function closeModalWindow() {
    setIsModalActive(false);
    setCurrentArtist("");
    setCurrentCard(undefined);
  }

  return (
    <>
      {isModalActive ? currentCard : null}
      {loading === 1 ? (
        <h1>Loading data...</h1>
      ) : loading === 2 ? (
        <h1>No artists were found. Try different name.</h1>
      ) : null}
      <div className="cards-wrapper">
        {cards ? cards : <h3>Search artists to display them.</h3>}
      </div>
    </>
  );
}

export default Cards;
