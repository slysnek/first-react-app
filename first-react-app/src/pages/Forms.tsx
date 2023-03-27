import CurrentPage from "../components/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";
import SubmitForm from "../components/SubmitForm";
import FormCard from "../components/FormCard";

class Forms extends React.Component<object, { formCards: JSX.Element[]; key: number }> {
  constructor(props: object) {
    super(props);
    this.addNewCard = this.addNewCard.bind(this);
    this.state = {
      formCards: [],
      key: 1,
    };
  }

  addNewCard(data: string[]) {
    this.setState({
      key: this.state.key + 1,
    });
    const newFormCard = (
      <FormCard
        songName={data[0]}
        songDate={data[1]}
        songRating={data[2]}
        songExplicit={data[3] === "true" ? "Yes" : "No"}
        songAuthor={data[4]}
        songImage={data[5]}
        key={this.state.key}
      ></FormCard>
    );
    this.setState({
      formCards: this.state.formCards.concat(newFormCard),
    });
  }

  render() {
    return (
      <div className="forms-page">
        <CurrentPage currentPage={"Forms"}></CurrentPage>
        <Link className="link" to="/">
          To home page
        </Link>
        <SubmitForm isFormCorrect={this.addNewCard}></SubmitForm>
        <div className="form-cards">{this.state.formCards}</div>
      </div>
    );
  }
}

export default Forms;
