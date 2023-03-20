import React from "react";

class SearchBar extends React.Component<object, { searchValue: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchValue: localStorage.getItem("searchValue") as string,
    };
  }

  handleInput = (e: { currentTarget: { value: string } }) => {
    const newSearchValue = e.currentTarget.value;
    this.setState({ searchValue: newSearchValue });
    localStorage.setItem("searchValue", newSearchValue);
  };

  render() {
    return (
      <div className="search-wrapper">
        <input
          value={this.state.searchValue}
          placeholder="type something here"
          className="search-input"
          onInput={this.handleInput}
        />
        <button className="search-button">search</button>
      </div>
    );
  }
}

export default SearchBar;
