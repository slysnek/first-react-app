import React from "react";

function Card(props: { songArtist: string; songImage: string }) {
  const { songArtist, songImage } = props;
  return (
    <>
      <div className="card">
        <h4 className="song-artist">{songArtist}</h4>
        <img className="song-image" src={songImage} alt="album picture" />
      </div>
    </>
  );
}

export default Card;
