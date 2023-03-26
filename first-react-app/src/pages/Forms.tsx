import CurrentPage from "../components/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";
import SubmitForm from "../components/SubmitForm";

function Forms() {
  return (
    <div className="forms-page">
      <CurrentPage currentPage={"Forms"}></CurrentPage>
      <Link className="link" to="/">
        To home page
      </Link>
      <SubmitForm></SubmitForm>
    </div>
  );
}

export default Forms;
