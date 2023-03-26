import SearchBar from "../components/SearchBar";
import React from "react";
import { Link } from "react-router-dom";
import Cards from "../components/CardsShowcase";
import Input from "../components/Input";
import CurrentPage from "../components/CurrentPage";

function Home() {
  return (
    <>
      <CurrentPage currentPage={"Home"}></CurrentPage>
      <header className="header">
        <Link className="link" to="/">
          Home
        </Link>
        <SearchBar></SearchBar>
        <Link className="link" to="about-us">
          About us
        </Link>
        <Link className="link" to="forms">
          Forms
        </Link>
      </header>
      <Cards></Cards>
    </>
  );
}

export default Home;
