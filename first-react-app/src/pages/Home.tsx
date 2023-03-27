import SearchBar from "../components/SearchBar";
import React from "react";
import { Link } from "react-router-dom";
import Cards from "../components/CardsShowcase";
import CurrentPage from "../components/CurrentPage";

function Home() {
  return (
    <>
      <CurrentPage currentPage={"Home"}></CurrentPage>
      <header className="header">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="about-us">
          About us
        </Link>
        <Link className="link" to="forms">
          Forms
        </Link>
        <SearchBar></SearchBar>
      </header>
      <Cards></Cards>
    </>
  );
}

export default Home;
