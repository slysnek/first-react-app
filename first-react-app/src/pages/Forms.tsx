import CurrentPage from "../components/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";
import SubmitForm from "../components/SubmitForm";

class Forms extends React.Component<object> {
  constructor(props: object) {
    super(props);
    this.getData = this.getData.bind(this);
  }

  getData(val: (string | boolean | undefined)[]) {
    console.log(val);
  }

  render() {
    return (
      <div className="forms-page">
        <CurrentPage currentPage={"Forms"}></CurrentPage>
        <Link className="link" to="/">
          To home page
        </Link>
        <SubmitForm isFormCorrect={this.getData}></SubmitForm>
      </div>
    );
  }
}

export default Forms;
