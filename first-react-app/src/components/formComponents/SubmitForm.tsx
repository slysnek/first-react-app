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

type InputText = {
  text: string;
  hasError: boolean;
}

class SubmitForm extends React.Component<
  ISubmit,
  { popUpClass: string; popUpText: string; text: InputText }
> {
  dateRef: React.RefObject<DateInput>;
  selectRef: React.RefObject<SelectInput>;
  checkboxRef: React.RefObject<CheckboxInput>;
  radioRef: React.RefObject<RadioInput>;
  uploadRef: React.RefObject<UploadInput>;
  constructor(props: ISubmit) {
    super(props);
    this.state = {
      popUpClass: "error-hidden",
      popUpText: "You have errors in form. Please correct them.",
      text: { text: "Test text", hasError: false },
    };
    this.dateRef = React.createRef();
    this.selectRef = React.createRef();
    this.checkboxRef = React.createRef();
    this.radioRef = React.createRef();
    this.uploadRef = React.createRef();
    this.handleErrors = this.handleErrors.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  handleErrors() {
    const isTextWrong = this.state.text.hasError;
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

      const checkBoxValuetoString = this.checkboxRef.current!.state.checked as boolean;

      const formData = [
        this.state.text.text as string,
        this.dateRef.current?.state.date as string,
        this.selectRef.current?.state.rating as string,
        checkBoxValuetoString.toString() as string,
        this.radioRef.current?.state.whoMade as string,
        this.uploadRef.current?.state.pic as string,
      ];
      console.log(formData);
      this.props.isFormCorrect(formData);
    }
  }

  handleText = (data: InputText) => {
    this.setState({ text: data });
  };

  render() {
    return (
      <form className="submit-wrapper">
        <TextInput onTextInput={this.handleText}></TextInput>
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
