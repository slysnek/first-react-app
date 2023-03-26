import React from "react";

class DateInput extends React.Component<object> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="submit-data-wrapper">
        <p>When was this song created?</p>
        <input type="date" className="submit-data" />
      </div>
    );
  }
}

export default DateInput;
