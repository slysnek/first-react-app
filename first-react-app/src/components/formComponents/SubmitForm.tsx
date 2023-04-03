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
};
type InputDate = {
  date: string;
  hasError: boolean;
};
type InputSelect = {
  rating: string;
};
type InputCheckbox = {
  checked: boolean;
};
type InputRadio = {
  whoMade: string;
};

class SubmitForm extends React.Component<
  ISubmit,
  {
    popUpClass: string;
    popUpText: string;
    text: InputText;
    date: InputDate;
    select: InputSelect;
    checkbox: InputCheckbox;
    radio: InputRadio;
  }
> {
  uploadRef: React.RefObject<UploadInput>;
  constructor(props: ISubmit) {
    super(props);
    this.state = {
      popUpClass: "error-hidden",
      popUpText: "You have errors in form. Please correct them.",
      text: { text: "Best text", hasError: false },
      date: { date: "2023-01-01", hasError: false },
      select: { rating: "1" },
      checkbox: { checked: false },
      radio: { whoMade: "By me" },
    };
    this.uploadRef = React.createRef();
    this.handleErrors = this.handleErrors.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleErrors() {
    const isTextWrong = this.state.text.hasError;
    const isDateWrong = this.state.date.hasError;

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

      const checkBoxValuetoString = this.state.checkbox.checked;

      const formData = [
        this.state.text.text as string,
        this.state.date.date as string,
        this.state.select.rating as string,
        checkBoxValuetoString.toString() as string,
        this.state.radio.whoMade as string,
        this.uploadRef.current?.state.pic as string,
      ];
      console.log(formData);
      this.props.isFormCorrect(formData);
    }
  }

  handleText = (data: InputText) => {
    this.setState({ text: data });
  };

  handleDate = (data: InputDate) => {
    this.setState({ date: data });
  };

  handleSelect = (data: InputSelect) => {
    this.setState({ select: data });
  };

  handleCheckbox = (data: InputCheckbox) => {
    this.setState({ checkbox: data });
  };

  handleRadio = (data: InputRadio) => {
    this.setState({ radio: data });
  };

  render() {
    return (
      <div className="submit-wrapper">
        <TextInput onTextInput={this.handleText}></TextInput>
        <DateInput onDateInput={this.handleDate}></DateInput>
        <SelectInput onSelectInput={this.handleSelect}></SelectInput>
        <CheckboxInput onCheckboxInput={this.handleCheckbox}></CheckboxInput>
        <RadioInput onRadioInput={this.handleRadio}></RadioInput>
        <UploadInput ref={this.uploadRef}></UploadInput>
        <p className={this.state.popUpClass}>{this.state.popUpText}</p>
        <button className="submit-button" onClick={this.handleErrors}>
          Submit
        </button>
      </div>
    );
  }
}

export default SubmitForm;
