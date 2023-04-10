import React from "react";

function Card(props: {
  songName: string;
  songArtist: string;
  songImage: string;
  songGenre: string;
  songAlbum: string;
}) {
  const { songName, songArtist, songImage, songGenre, songAlbum } = props;
  return (
    <>
      <div className="card">
        <h4 className="song-name">{songName}</h4>
        <p className="song-artist">{songArtist}</p>
        <img className="song-image" src={songImage} alt="album picture" />
        <p className="song-genre">{songGenre}</p>
        <p className="song-album">{songAlbum}</p>
      </div>
    </>
  );
}

export default Card;
