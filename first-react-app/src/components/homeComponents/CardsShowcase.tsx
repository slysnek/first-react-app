import React from "react";
import { songs } from "../../data/songsList";
import Card from "./Card";

function Cards() {
  const cards: JSX.Element[] = [];
  for (let i = 0; i < songs.length; i++) {
    cards.push(
      <Card
        key={songs[i].id}
        songName={songs[i].name}
        songArtist={songs[i].artist}
        songImage={songs[i].image}
        songGenre={songs[i].genre}
        songAlbum={songs[i].album}
      ></Card>
    );
  }
  return <div className="cards-wrapper">{cards}</div>;
}

export default Cards;
