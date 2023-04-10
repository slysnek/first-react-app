import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import note from "../../assets/note.png";
import ModalCard from "./ModalCard";

function Cards(props: { searchValue: string }) {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState(0);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    async function getArtistInfo() {
      const artistData = await lastFM.getArtistInfo(props.searchValue);
      return artistData;
    }
    async function getArtistPictures(
      data: { name: string; image: { size: string; "#text": string }[] }[]
    ) {
      for (const artists of data) {
        const trimmedName = artists.name.replace(/\s+/g, "");
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=967b0e577e1c06b79eeb679cb791b1ec&tags=${trimmedName}&extras=url_l&format=json&nojsoncallback=1`;
        const result = await fetch(url);
        const artistPicture = await result.json();
        console.log(artistPicture);
        console.log(artistPicture.photos.photo, artists.name);
        if (artistPicture.photos.photo.length === 0) {
          artists.image[3]["#text"] = note;
        } else {
          artists.image[3]["#text"] =
            artistPicture.photos.photo[
              Math.floor(Math.random() * artistPicture.photos.photo.length)
            ].url_l;
          if (artists.image[3]["#text"] === undefined) {
            artistPicture.photos.photo[
              Math.floor(Math.random() * artistPicture.photos.photo.length)
            ].url_l;
          }
          console.log(artists.image[3]["#text"]);
        }
      }
      return data;
    }

    async function addArtistDataToArray() {
      const artistInfo: JSX.Element[] = [];
      if (props.searchValue) setLoading(1);
      const data = await getArtistInfo();
      if (data === undefined) {
        setCards(null);
        setLoading(0);
        return;
      }
      if (data.length === 0) {
        setCards(null);
        setLoading(2);
        return;
      }
      const dataWithImages = await getArtistPictures(data);
      console.log(dataWithImages);
      let count = 1;
      for (const artists of dataWithImages) {
        artistInfo.push(
          <Card
            handleCardClick={displayModalWindow}
            key={count}
            songArtist={artists.name}
            songImage={artists.image[3]["#text"]}
          ></Card>
        );
        count++;
      }
      setCards(artistInfo);
      setLoading(0);
    }

    addArtistDataToArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchValue]);

  function displayModalWindow(artist: string) {
    console.log(artist);
    setIsModalActive(true);
  }

  function closeModalWindow() {
    setIsModalActive(false);
  }

  return (
    <>
      {isModalActive ? <ModalCard handleModalClose={closeModalWindow} songArtist={"Test"} /> : null}
      {loading === 1 ? <h1>Loading data...</h1> : null}
      {loading === 2 ? <h1>No artists were found. Please try again.</h1> : null}
      <div className="cards-wrapper">
        {cards ? cards : <h3>Search artists to display them.</h3>}
      </div>
    </>
  );
}

export default Cards;
