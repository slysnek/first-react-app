import React from "react";

class Input extends React.Component<object, { searchValue: string }> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="input-wrapper">
        <input type="checkbox" name="" id="" defaultValue="false" />
        <button className="search-button">Checkbox</button>
      </div>
    );
  }
}

export default Input;
