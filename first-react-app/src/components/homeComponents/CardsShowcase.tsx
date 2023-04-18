import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../data/reduxStore";
import { getArtistByName } from "../../data/artistDataSlice";
import { addCard } from "../../data/cardsSlice";

function Cards() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentCard, setCurrentCard] = useState<JSX.Element>();

  const cardsStore = useSelector((state: RootState) => state.cardsInStore.cards);
  const searchStore = useSelector((state: RootState) => state.searchInStore);
  const artistsStore = useSelector((state: RootState) => state.artistsInStore);
  const dispatch = useDispatch<AppDispatch>();

  async function getArtist() {
    await dispatch(getArtistByName(searchStore.searchText));
  }

  async function addArtistToArray() {
    const artistInfo: JSX.Element[] = [];
    let count = 1;
    if (artistsStore.artists === null) return;
    for (const artists of artistsStore!.artists) {
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
    dispatch(addCard(artistInfo));
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
        similar={data!.similar.artist}
        tags={data!.tags.tag}
        bio={{
          published: data!.published,
          summary: data!.summary,
        }}
      ></ModalCard>
    );
    setCurrentCard(modalCard);
  }

  useEffect(() => {
    async function displayCards() {
      await getArtist();
      await addArtistToArray();
    }
    displayCards();
    console.log(artistsStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistsStore]);

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
      <h1>{artistsStore.status}</h1>
      <div className="cards-wrapper">{cardsStore}</div>
    </>
  );
}

export default Cards;
