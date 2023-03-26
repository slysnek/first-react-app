import React from "react";

class DateInput extends React.Component<
  object,
  { errorClass: string; errorText: string; hasError: boolean; date: string | undefined }
> {
  dateInput: React.RefObject<HTMLInputElement>;
  constructor(props: object) {
    super(props);
    this.dateInput = React.createRef();
    this.state = {
      errorClass: "error-hidden",
      errorText: "You cannot choose the future date",
      hasError: false,
      date: "2023-01-01",
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    const inputDate = new Date(this.dateInput.current!.value);
    if (inputDate > new Date()) {
      this.setState({
        errorClass: "error-visible",
        hasError: true,
      });
    } else {
      this.setState({
        errorClass: "error-hidden",
        hasError: false,
        date: this.dateInput.current?.value,
      });
    }
  }

  render() {
    return (
      <div className="submit-data-wrapper">
        <p>When was this song created?</p>
        <p className={this.state.errorClass}>{this.state.errorText}</p>
        <input
          defaultValue={"2023-01-01"}
          ref={this.dateInput}
          type="date"
          className="submit-data"
          onBlur={this.handleError}
        />
      </div>
    );
  }
}

export default DateInput;
