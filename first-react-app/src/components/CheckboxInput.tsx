import React from "react";

class CheckboxInput extends React.Component<object> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="submit-checkbox-wrapper">
        <label htmlFor="has-explicit-content">
          Check the mark if the song has explicit content.
        </label>
        <input id="has-explicit-content" type="checkbox" className="submit-checkbox" />
      </div>
    );
  }
}

export default CheckboxInput;
