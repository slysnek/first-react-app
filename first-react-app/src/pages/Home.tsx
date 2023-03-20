import SearchBar from "../components/SearchBar";
import React from "react";
import { Link } from "react-router-dom";
import Cards from "../components/CardsShowcase";

function Home() {
  return (
    <>
      <header className="header">
        <Link className="link" to="/">
          Home
        </Link>
        <SearchBar></SearchBar>
        <Link className="link" to="about-us">
          About us
        </Link>
      </header>
      <Cards></Cards>
    </>
  );
}

export default Home;
