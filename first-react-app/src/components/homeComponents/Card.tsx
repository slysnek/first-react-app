import React from "react";

function Card(props: { songArtist: string; songImage: string }) {
  const { songArtist, songImage } = props;
  return (
    <>
      <div className="card">
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
