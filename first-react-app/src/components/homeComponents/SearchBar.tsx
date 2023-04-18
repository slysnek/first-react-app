import { addingTextToSearch, searchActive } from "../../data/searchSlice";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../data/reduxStore";

function SearchBar() {
  const searchWindow = useRef<HTMLInputElement>(null);

  const searchValue = useSelector((state: RootState) => state.searchInStore.searchText);
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: { preventDefault: () => void }) {
    dispatch(searchActive());
    e.preventDefault();
  }

  return (
    <>
      <h2>Search value from STORE: {searchValue}</h2>
      <form onSubmit={handleSubmit} className="search-wrapper">
        <input
          ref={searchWindow}
          type="search"
          value={searchValue}
          placeholder="type something here"
          className="search-input"
          onChange={() => {
            dispatch(addingTextToSearch(searchWindow.current!.value));
            setTimeout(() => console.log(searchValue), 3000);
          }}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </>
  );
}

export default SearchBar;
