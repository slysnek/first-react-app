import React from "react";

function Card(props: {
  handleCardClick: (arg0: string) => void;
  songArtist: string;
  songImage: string;
}) {
  const { songArtist, songImage } = props;

  function handleClick() {
    props.handleCardClick(songArtist);
  }

  return (
    <>
      <div onClick={handleClick} className="card">
        <h4 className="song-artist">{songArtist}</h4>
        <img
          className="song-image"
          src={songImage}
          alt="The picture isn't accessible anymore on the API website."
        />
      </div>
    </>
  );
}

export default Card;
