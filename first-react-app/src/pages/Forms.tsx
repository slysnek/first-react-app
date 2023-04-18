import CurrentPage from "../components/homeComponents/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";
import SubmitForm from "../components/formComponents/SubmitForm";
import FormCard from "../components/formComponents/FormCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../data/reduxStore";
import { addFormCard } from "../data/formSlice";

function Forms() {
  const formCardsStore = useSelector((state: RootState) => state.formInStore.formCards);
  const dispatch = useDispatch();

  function addNewCard(data: string[]) {
    const newFormCard = (
      <FormCard
        songName={data[0]}
        songDate={data[1]}
        songRating={data[2]}
        songExplicit={data[3] === "true" ? "Yes" : "No"}
        songAuthor={data[4]}
        songImage={data[5]}
        key={Date.now().toString().slice(6)}
      ></FormCard>
    );
    dispatch(addFormCard(newFormCard));
  }

  return (
    <div className="forms-page">
      <CurrentPage currentPage={"Forms"}></CurrentPage>
      <Link className="link" to="/">
        To home page
      </Link>
      <SubmitForm isFormCorrect={addNewCard}></SubmitForm>
      <div className="form-cards">{formCardsStore}</div>
    </div>
  );
}

export default Forms;
