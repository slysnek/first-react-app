import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Cards(props: { searchValue: string }) {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);

  useEffect(() => {
    async function getArtistInfo() {
      const artistData = await lastFM.getArtistInfo(props.searchValue);
      if (artistData) return artistData;
    }

    async function addArtistDataToArray() {
      const artistInfo: JSX.Element[] = [];
      const data = await getArtistInfo();
      if (data === undefined) return undefined;
      let count = 1;
      for (const artists of data) {
        console.log(artists);
        artistInfo.push(
          <Card key={count} songArtist={artists.name} songImage={artists.image[1].text}></Card>
        );
        count++;
      }
      setCards(artistInfo);
    }

    addArtistDataToArray();
  }, [props.searchValue]);

  return (
    <div className="cards-wrapper">
      {cards ? cards : <h3>Nothing to display. Search artists to display them.</h3>}
    </div>
  );
}

export default Cards;
