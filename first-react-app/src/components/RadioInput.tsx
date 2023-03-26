import React from "react";

class RadioInput extends React.Component<object, { whoMade: string | undefined }> {
  constructor(props: object) {
    super(props);
    this.state = {
      whoMade: "By me",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: { currentTarget: { value: string } }) {
    this.setState({
      whoMade: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="submit-radio-wrapper">
        <p>Was the song made by you or by someone else?</p>
        <input
          id="by-me"
          defaultChecked={true}
          type="radio"
          name="artist"
          value="By me"
          className="submit-radio"
          onChange={this.handleChange}
        />
        <label htmlFor="by-me">By me.</label>
        <input
          onChange={this.handleChange}
          id="by-someone"
          name="artist"
          value="By someone else"
          type="radio"
          className="submit-radio"
        />
        <label htmlFor="by-someone">Someone else made this song.</label>
      </div>
    );
  }
}

export default RadioInput;
