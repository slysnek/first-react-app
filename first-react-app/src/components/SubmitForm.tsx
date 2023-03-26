import React from "react";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import UploadInput from "./UploadInput";

interface IFormData {
  (a: (string | boolean | undefined)[]): void;
}

interface ISubmit extends Object {
  isFormCorrect: IFormData;
}

class SubmitForm extends React.Component<ISubmit, { errorClass: string }> {
  textRef: React.RefObject<TextInput>;
  dateRef: React.RefObject<DateInput>;
  selectRef: React.RefObject<SelectInput>;
  checkboxRef: React.RefObject<CheckboxInput>;
  radioRef: React.RefObject<RadioInput>;
  uploadRef: React.RefObject<UploadInput>;
  constructor(props: ISubmit) {
    super(props);
    this.state = {
      errorClass: "error-hidden",
    };
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

    if (isTextWrong || isDateWrong) {
      this.setState({
        errorClass: "error-visible",
      });
    } else {
      this.setState({
        errorClass: "error-hidden",
      });
      const formData = [
        this.textRef.current?.state.text,
        this.dateRef.current?.state.date,
        this.selectRef.current?.state.rating,
        this.checkboxRef.current?.state.checked,
        this.radioRef.current?.state.whoMade,
      ];
      this.props.isFormCorrect(formData);
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
        <p className={this.state.errorClass}>You have errors in form. Please correct them.</p>
        <button className="submit-button" onClick={this.handleErrors}>
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitForm;
