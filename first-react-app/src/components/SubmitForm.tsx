import React from "react";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import UploadInput from "./UploadInput";

export interface IFormData {
  (a: string[]): void;
}

interface ISubmit extends Object {
  isFormCorrect: IFormData;
}

class SubmitForm extends React.Component<ISubmit, { popUpClass: string; popUpText: string }> {
  textRef: React.RefObject<TextInput>;
  dateRef: React.RefObject<DateInput>;
  selectRef: React.RefObject<SelectInput>;
  checkboxRef: React.RefObject<CheckboxInput>;
  radioRef: React.RefObject<RadioInput>;
  uploadRef: React.RefObject<UploadInput>;
  formRef: React.RefObject<HTMLFormElement>;
  constructor(props: ISubmit) {
    super(props);
    this.state = {
      popUpClass: "error-hidden",
      popUpText: "You have errors in form. Please correct them.",
    };
    this.textRef = React.createRef();
    this.dateRef = React.createRef();
    this.selectRef = React.createRef();
    this.checkboxRef = React.createRef();
    this.radioRef = React.createRef();
    this.uploadRef = React.createRef();
    this.formRef = React.createRef();
    this.handleErrors = this.handleErrors.bind(this);
  }

  handleErrors() {
    const isTextWrong = this.textRef.current?.state.hasError;
    const isDateWrong = this.dateRef.current?.state.hasError;

    if (isTextWrong || isDateWrong) {
      this.setState({
        popUpClass: "error-visible",
        popUpText: "You have errors in form. Please correct them.",
      });
    } else {
      this.setState({
        popUpClass: "confirm-visible",
        popUpText: "You have successfully created a card",
      });
      const formData = [
        this.textRef.current?.state.text as string,
        this.dateRef.current?.state.date as string,
        this.selectRef.current?.state.rating as string,
        this.checkboxRef.current?.state.checked as string,
        this.radioRef.current?.state.whoMade as string,
        this.uploadRef.current?.state.pic as string,
      ];
      this.props.isFormCorrect(formData);

      this.textRef.current?.setState({
        text: this.textRef.current.textInput.current?.defaultValue,
      });
      this.dateRef.current?.setState({
        date: this.dateRef.current.dateInput.current?.defaultValue,
      });
      this.selectRef.current?.setState({
        rating: "1",
      });

      this.formRef.current?.reset();
    }
  }

  render() {
    return (
      <form ref={this.formRef} className="submit-wrapper">
        <TextInput ref={this.textRef}></TextInput>
        <DateInput ref={this.dateRef}></DateInput>
        <SelectInput ref={this.selectRef}></SelectInput>
        <CheckboxInput ref={this.checkboxRef}></CheckboxInput>
        <RadioInput ref={this.radioRef}></RadioInput>
        <UploadInput ref={this.uploadRef}></UploadInput>
        <p className={this.state.popUpClass}>{this.state.popUpText}</p>
        <button className="submit-button" onClick={this.handleErrors}>
          Submit
        </button>
      </form>
    );
  }
}

export default SubmitForm;
