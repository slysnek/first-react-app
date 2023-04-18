import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../data/reduxStore";

function Cards() {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentArtist, setCurrentArtist] = useState("");
  const [currentCard, setCurrentCard] = useState<JSX.Element>();

  const searchStore = useSelector((state: RootState) => state.searchInStore);
  const artistsStore = useSelector((state: RootState) => state.artistsInStore);
  const dispatch = useDispatch<AppDispatch>();

  async function getArtistInfo(artist: string) {
    const artistData = await lastFM.getArtistInfo(artist);
    return artistData;
  }

  useEffect(() => {
    if (isModalActive) {
      addDataToModalWindow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalActive, currentArtist]);

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
      <h1>{searchStore.isSearching.toString()}</h1>
      <div className="cards-wrapper">
        {artistsStore.artists?.map((el) => {
          return (
            <Card
              handleCardClick={displayModalWindow}
              songArtist={el.name}
              songImage={el.image}
              key={Math.random()}
            ></Card>
          );
        })}
      </div>
    </>
  );
}

export default Cards;
