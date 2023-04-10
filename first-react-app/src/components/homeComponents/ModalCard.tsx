import React from "react";

function ModalCard(props: {
  handleModalClose: () => void;
  name: string;
  similar: { name: string }[];
  tags: { name: string }[];
  bio: { published: string; summary: string };
}) {
  const { name, similar, tags, bio } = props;

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
          <h2 className="close" onClick={handleCloseClick}>
            X
          </h2>
          <h2 className="artist-name">{name}</h2>
          <p>First published: </p> <span>{bio.published}</span>
          <div className="modal-tags-artists">
            <ul>
              <p className="modal-header">Tags:</p>
              {tags.map(function (item, i) {
                return <li key={i}>{item.name}</li>;
              })}
            </ul>
            <ul>
              <p className="modal-header">Similar artists:</p>
              {similar.map(function (item, i) {
                return <li key={i}>{item.name}</li>;
              })}
            </ul>
          </div>
          <p className="modal-header">Biography:</p>
          <p>{bio.summary.split("<")[0]}</p>
        </div>
      </div>
    </>
  );
}

export default ModalCard;
