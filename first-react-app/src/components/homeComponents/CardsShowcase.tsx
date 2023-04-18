import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../data/reduxStore";
import { changeModal, getArtistModalInfo } from "../../data/artistModalCardSlice";

function Cards() {
  /* const [isModalActive, setIsModalActive] = useState(false); */

  const searchStore = useSelector((state: RootState) => state.searchInStore);
  const artistsStore = useSelector((state: RootState) => state.artistsInStore);
  const modalStore = useSelector((state: RootState) => state.artistsInfoStore.artistsInfo);
  const isModalActive = useSelector((state: RootState) => state.artistsInfoStore.isModalActive);
  const dispatch = useDispatch<AppDispatch>();

  function closeModalWindow() {
    dispatch(changeModal(false));
  }

  return (
    <>
      <div className="modal-wrapper">
        {modalStore && isModalActive ? (
          <ModalCard
            key={Math.random()}
            handleModalClose={closeModalWindow}
            name={modalStore!.name}
            similar={modalStore!.similar}
            tags={modalStore!.tags}
            bio={{
              published: modalStore!.published,
              summary: modalStore!.summary,
            }}
          ></ModalCard>
        ) : (
          "no modal"
        )}
      </div>
      <h1>{artistsStore.status}</h1>
      <h1>{searchStore.isSearching.toString()}</h1>
      <div className="cards-wrapper">
        {artistsStore.artists?.map((el) => {
          return (
            <Card
              handleCardClick={() => console.log("hi")}
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
