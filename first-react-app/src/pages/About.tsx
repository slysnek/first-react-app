import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <h1>About us</h1>
      <p>Some information about us</p>
      <Link to="/">Home</Link>
    </>
  );
}

export default About;
