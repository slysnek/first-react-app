import React from "react";

class SearchBar extends React.Component<object, { searchValue: string }> {
  searchInput: JSX.Element;
  constructor(props: any) {
    super(props);
    this.state = {
      searchValue: "",
    };
    this.searchInput = (
      <input
        value={props.search ? props.search : ""}
        placeholder="type something here"
        className="search-input"
        onChange={this.handleInput}
      />
    );
  }

  handleInput = (e) => {
    const newSearchValue = e.target.value;
    console.log(newSearchValue);
    localStorage.setItem("searchValue", newSearchValue);
  };

  componentWillUnmount() {
    const newSearchValue = this.searchInput.props.value;
    this.setState({ searchValue: newSearchValue });
  }

  render() {
    console.log('RENDER');
    return (
      <div className="search-wrapper">
        {this.searchInput}
        <button className="search-button">search</button>
      </div>
    );
  }
}

export default SearchBar;
