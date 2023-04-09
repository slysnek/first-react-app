import SearchBar from "../components/homeComponents/SearchBar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cards from "../components/homeComponents/CardsShowcase";
import CurrentPage from "../components/homeComponents/CurrentPage";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(currentSearchValue: string) {
    setSearchValue(currentSearchValue);
  }

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
        <SearchBar sendSearchValueToHome={handleSearch}></SearchBar>
      </header>
      <Cards searchValue={searchValue}></Cards>
    </>
  );
}

export default Home;
