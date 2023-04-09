import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Cards(props: { searchValue: string }) {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    async function getArtistInfo() {
      const artistData = await lastFM.getArtistInfo(props.searchValue);
      return artistData;
    }

    async function addArtistDataToArray() {
      const artistInfo: JSX.Element[] = [];
      if (props.searchValue) setLoading(1);
      const data = await getArtistInfo();
      if (data === undefined) {
        setCards(null);
        setLoading(0);
        return;
      }
      if (data.length === 0) {
        setCards(null);
        setLoading(2);
        return;
      }
      let count = 1;
      for (const artists of data) {
        artistInfo.push(
          <Card key={count} songArtist={artists.name} songImage={artists.image[3]["#text"]}></Card>
        );
        count++;
      }
      setCards(artistInfo);
      setLoading(0);
    }

    addArtistDataToArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchValue]);

  return (
    <>
      {loading === 1 ? <h1>LOADING</h1> : null}
      {loading === 2 ? <h1>No artists were found. Please try again.</h1> : null}
      <div className="cards-wrapper">
        {cards ? cards : <h3>Search artists to display them.</h3>}
      </div>
    </>
  );
}

export default Cards;
