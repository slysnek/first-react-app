import CurrentPage from "../components/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";

function Forms() {
  return (
    <>
      <CurrentPage currentPage={"Forms"}></CurrentPage>
      <h1>Forms</h1>
      <p>Forms page</p>
      <input type="text" />
      <Link to="/">Home</Link>
    </>
  );
}

export default Forms;
