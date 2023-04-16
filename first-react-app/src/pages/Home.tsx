import SearchBar from "../components/homeComponents/SearchBar";
import React from "react";
import { Link } from "react-router-dom";
import Cards from "../components/homeComponents/CardsShowcase";
import CurrentPage from "../components/homeComponents/CurrentPage";
import { useSelector } from "react-redux";
import { RootState } from "data/reduxStore";

function Home() {
  const searchValue = useSelector((state: RootState) => state.searchInStore.searchText);
  const isSearching = useSelector((state: RootState) => state.searchInStore.isSearching);

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
      <Cards searchValue={isSearching ? searchValue : ""}></Cards>
    </>
  );
}

export default Home;
