import React from "react";

function ModalCard(props: { handleModalClose: () => void; songArtist: string }) {
  const { songArtist } = props;

  function handleOverlayClick() {
    props.handleModalClose();
  }
  function handleModalClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
  }
  function handleCloseClick(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    props.handleModalClose();
  }

  return (
    <>
      <div onClick={handleOverlayClick} className="modal-overlay">
        <div onClick={handleModalClick} className="modal-card">
          <h3 className="close" onClick={handleCloseClick}>
            X
          </h3>
          <h4 className="song-artist">{songArtist}</h4>
        </div>
      </div>
    </>
  );
}

export default ModalCard;
