import React from "react";
import Card from "./Card";
import ModalCard from "./ModalCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../data/reduxStore";
import { changeModal } from "../../data/artistModalCardSlice";

function Cards() {
  const artistsStore = useSelector((state: RootState) => state.artistsInStore);
  const modalStore = useSelector((state: RootState) => state.artistsInfoStore.artistsInfo);
  const isModalActiveStore = useSelector(
    (state: RootState) => state.artistsInfoStore.isModalActive
  );
  const dispatch = useDispatch<AppDispatch>();

  function closeModalWindow() {
    dispatch(changeModal(false));
  }

  return (
    <>
      <div className="modal-wrapper">
        {modalStore && isModalActiveStore ? (
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
        ) : null}
      </div>
      <h1>{artistsStore.status}</h1>
      <div className="cards-wrapper">
        {artistsStore.artists?.map((el) => {
          return <Card songArtist={el.name} songImage={el.image} key={Math.random()}></Card>;
        })}
      </div>
    </>
  );
}

export default Cards;
