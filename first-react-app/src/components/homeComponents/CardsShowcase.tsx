import { lastFM } from "../../api/lastFMAPI";
import React, { useEffect, useState } from "react";
import Card from "./Card";

function Cards(props: { searchValue: string }) {
  const [cards, setCards] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getArtistInfo() {
      const artistData = await lastFM.getArtistInfo(props.searchValue);
      return artistData;
    }

    async function addArtistDataToArray() {
      const artistInfo: JSX.Element[] = [];
      if (props.searchValue) setLoading(true);
      const data = await getArtistInfo();
      if (data === undefined || data!.length === 0) {
        setCards(null);
        setLoading(false);
        return;
      }
      let count = 1;
      for (const artists of data) {
        artistInfo.push(
          <Card key={count} songArtist={artists.name} songImage={artists.image[1].text}></Card>
        );
        count++;
      }
      setCards(artistInfo);
      setLoading(false);
    }

    addArtistDataToArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchValue]);

  return (
    <>
      {loading ? <h1>LOADING</h1> : null}
      <div className="cards-wrapper">
        {cards ? cards : <h3>Nothing to display. Search artists to display them.</h3>}
      </div>
    </>
  );
}

export default Cards;
