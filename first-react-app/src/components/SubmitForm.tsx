import React from "react";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import UploadInput from "./UploadInput";

class SubmitForm extends React.Component<object> {
  textRef: React.RefObject<TextInput>;
  dateRef: React.RefObject<DateInput>;
  selectRef: React.RefObject<SelectInput>;
  checkboxRef: React.RefObject<CheckboxInput>;
  radioRef: React.RefObject<RadioInput>;
  uploadRef: React.RefObject<UploadInput>;
  constructor(props: object) {
    super(props);
    this.textRef = React.createRef();
    this.dateRef = React.createRef();
    this.selectRef = React.createRef();
    this.checkboxRef = React.createRef();
    this.radioRef = React.createRef();
    this.uploadRef = React.createRef();
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleErrors() {
    const isTextWrong = this.textRef.current?.state.hasError;
    const isDateWrong = this.dateRef.current?.state.hasError;
    if (!isTextWrong && !isDateWrong) {
      console.log("hooray");
    }
  }

  render() {
    return (
      <div className="submit-wrapper">
        <TextInput ref={this.textRef}></TextInput>
        <DateInput ref={this.dateRef}></DateInput>
        <SelectInput ref={this.selectRef}></SelectInput>
        <CheckboxInput ref={this.checkboxRef}></CheckboxInput>
        <RadioInput ref={this.radioRef}></RadioInput>
        <UploadInput ref={this.uploadRef}></UploadInput>
        <button className="submit-button" onClick={this.handleErrors}>
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitForm;
