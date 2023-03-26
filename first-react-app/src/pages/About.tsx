import CurrentPage from "../components/CurrentPage";
import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <CurrentPage currentPage={"About"}></CurrentPage>
      <h1>About us</h1>
      <p>Some information about us</p>
      <Link to="/">Home</Link>
    </>
  );
}

export default About;
