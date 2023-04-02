import React, { useEffect, useState } from "react";
import { songs } from "../../data/songsList";
import Card from "./Card";

function Cards(props: { searchValue: string }) {
  const cards: JSX.Element[] = [];

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(props.searchValue) ||
      song.album.toLowerCase().includes(props.searchValue) ||
      song.artist.toLowerCase().includes(props.searchValue) ||
      song.genre.toLowerCase().includes(props.searchValue)
  );

  for (const songs of filteredSongs) {
    cards.push(
      <Card
        key={songs.id}
        songName={songs.name}
        songArtist={songs.artist}
        songImage={songs.image}
        songGenre={songs.genre}
        songAlbum={songs.album}
      ></Card>
    );
  }

  return <div className="cards-wrapper">{cards}</div>;
}

export default Cards;
