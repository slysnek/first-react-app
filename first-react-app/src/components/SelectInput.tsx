import React from "react";

class SelectInput extends React.Component<object, { rating: string | undefined }> {
  selectInput: React.RefObject<HTMLSelectElement>;
  constructor(props: object) {
    super(props);
    this.selectInput = React.createRef();
    this.state = {
      rating: "1",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      rating: this.selectInput.current?.value,
    });
  }

  render() {
    return (
      <div className="submit-select-wrapper">
        <p>Rate the song from 1 to 10</p>
        <select
          ref={this.selectInput}
          onChange={this.handleChange}
          name="rating"
          className="submit-select"
          defaultValue="My Best Song"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
    );
  }
}

export default SelectInput;
