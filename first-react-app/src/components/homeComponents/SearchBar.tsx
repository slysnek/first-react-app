import React, { useRef, useState } from "react";

function SearchBar() {
  const searchWindow = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchVal = localStorage.getItem("searchValue") as string;
    return savedSearchVal;
  });

  function handleInput() {
    const searchVal = searchWindow.current!.value as string;
    localStorage.setItem("searchValue", searchVal);
    setSearchValue(searchWindow.current!.value);
  }

  return (
    <div className="search-wrapper">
      <input
        ref={searchWindow}
        type="search"
        value={searchValue}
        placeholder="type something here"
        className="search-input"
        onInput={handleInput}
      />
      <button className="search-button">search</button>
    </div>
  );
}

export default SearchBar;
