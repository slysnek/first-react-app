import React, { useEffect, useRef, useState } from "react";

function SearchBar(props: { sendSearchValueToHome: (arg0: string) => void }) {
  const searchWindow = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(() => {
    const savedSearchVal = localStorage.getItem("searchValue") as string;
    return savedSearchVal;
  });

  function handleInput() {
    const currentSearch = searchWindow.current!.value as string;
    setSearchValue(currentSearch);
  }

  function handleSubmit() {
    const currentSearch = searchWindow.current!.value as string;
    props.sendSearchValueToHome(currentSearch.toLowerCase());
  }

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
    return () => {
      localStorage.getItem("searchValue");
    };
  }, [searchValue]);

  return (
    <form onSubmit={handleSubmit} className="search-wrapper">
      <input
        ref={searchWindow}
        type="search"
        value={searchValue}
        placeholder="type something here"
        className="search-input"
        onInput={handleInput}
      />
      <button type="submit" className="search-button">
        search
      </button>
    </form>
  );
}

export default SearchBar;
