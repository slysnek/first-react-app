import React from "react";

class RadioInput extends React.Component<object> {
  constructor(props: object) {
    super(props);
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
          className="submit-radio"
        />
        <label htmlFor="by-me">By me.</label>
        <input id="by-someone" name="artist" type="radio" className="submit-radio" />
        <label htmlFor="by-someone">Someone else made this song.</label>
      </div>
    );
  }
}

export default RadioInput;
