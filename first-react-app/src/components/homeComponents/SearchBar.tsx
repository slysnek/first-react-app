import { addingTextToSearch, submittingSearch } from "../../data/searchSlice";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "data/reduxStore";

function SearchBar() {
  const searchWindow = useRef<HTMLInputElement>(null);

  const searchValue = useSelector((state: RootState) => state.searchInStore.searchText);
  const dispatch = useDispatch();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    dispatch(submittingSearch());
  }

  return (
    <form onSubmit={handleSubmit} className="search-wrapper">
      <input
        ref={searchWindow}
        type="search"
        value={searchValue}
        placeholder="type something here"
        className="search-input"
        onInput={() => dispatch(addingTextToSearch(searchWindow.current!.value))}
      />
      <button type="submit" className="search-button">
        search
      </button>
    </form>
  );
}

export default SearchBar;
