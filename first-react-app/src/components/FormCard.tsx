import React from "react";

function FormCard(props: {
  songName: string;
  songDate: string;
  songRating: string;
  songExplicit: string;
  songAuthor: string;
  songImage: string;
}) {
  const { songName, songDate, songRating, songExplicit, songAuthor, songImage } = props;
  return (
    <>
      <div className="form-card">
        <h4 className="song-name">Song name: {songName}</h4>
        <p className="song-artist">Who created: {songAuthor}</p>
        <img
          className="song-image"
          src={songImage ? songImage : "src/assets/note.png"}
          alt="img probably won't load because it's local"
        />
        <p className="song-genre">Rating: {songRating}</p>
        <p className="song-date">Date of creation: {songDate}</p>
        <p className="song-explicit">Has explicit content:{songExplicit}</p>
      </div>
    </>
  );
}

export default FormCard;