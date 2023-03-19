import React from "react";

function SearchBar() {
  return (
    <div className="search-wrapper">
      <input placeholder="type something here" className="search-input" />
      <button className="search-button">search</button>
    </div>
  );
}

export default SearchBar;
