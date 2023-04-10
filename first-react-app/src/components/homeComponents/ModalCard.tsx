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
          <h3 className="close" onClick={handleCloseClick}>
            X
          </h3>
          <h4 className="artist-name">{name}</h4>
          <p>First published: {bio.published}</p>
          <p>Biography: {bio.summary.split("<")[0]}</p>
          <ul>
            <p>Tags:</p>
            {tags.map(function (item, i) {
              return <li key={i}>{item.name}</li>;
            })}
          </ul>
          <ul>
            <p>Similar artists:</p>
            {similar.map(function (item, i) {
              return <li key={i}>{item.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ModalCard;
