import { changeModal, getArtistModalInfo } from "../../data/artistModalCardSlice";
import { AppDispatch } from "data/reduxStore";
import React from "react";
import { useDispatch } from "react-redux";

function Card(props: {
  handleCardClick: (arg0: string) => void;
  songArtist: string;
  songImage: string;
}) {
  const { songArtist, songImage } = props;

  const dispatch = useDispatch<AppDispatch>();

  function handleClick() {
    dispatch(getArtistModalInfo(songArtist));
    dispatch(changeModal(true));
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
