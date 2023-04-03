import React, { useState } from "react";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import UploadInput from "./UploadInput";

export interface IFormData {
  (a: string[]): void;
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
type InputUpload = {
  pic: string;
};

function SubmitForm(props: { isFormCorrect: (arg0: string[]) => void }) {
  const [popUpClass, setpopUpClass] = useState("error-hidden");
  const [popUpText, setpopUpText] = useState("You have errors in form. Please correct them.");
  const [text, setText] = useState({ text: "Best text", hasError: false });
  const [date, setDate] = useState({ date: "2023-01-01", hasError: false });
  const [select, setSelect] = useState({ rating: "1" });
  const [checkbox, setCheckbox] = useState({ checked: false });
  const [radio, setRadio] = useState({ whoMade: "By me" });
  const [upload, setUpload] = useState({ pic: "" });

  function handleErrors() {
    const isTextWrong = text.hasError;
    const isDateWrong = date.hasError;

    if (isTextWrong || isDateWrong) {
      setpopUpClass("error-visible");
      setpopUpText("You have errors in form. Please correct them.");
    } else {
      setpopUpClass("confirm-visible");
      setpopUpText("You have successfully created a card.");

      const checkBoxValuetoString = checkbox.checked;

      const formData = [
        text.text as string,
        date.date as string,
        select.rating as string,
        checkBoxValuetoString.toString() as string,
        radio.whoMade as string,
        upload.pic as string,
      ];
      console.log(formData);
      props.isFormCorrect(formData);
    }
  }

  function handleText(data: InputText) {
    setText(data);
  }

  function handleDate(data: InputDate) {
    setDate(data);
  }

  function handleSelect(data: InputSelect) {
    setSelect(data);
  }

  function handleCheckbox(data: InputCheckbox) {
    setCheckbox(data);
  }

  function handleRadio(data: InputRadio) {
    setRadio(data);
  }

  function handleUpload(data: InputUpload) {
    setUpload(data);
  }

  return (
    <div className="submit-wrapper">
      <TextInput onTextInput={handleText}></TextInput>
      <DateInput onDateInput={handleDate}></DateInput>
      <SelectInput onSelectInput={handleSelect}></SelectInput>
      <CheckboxInput onCheckboxInput={handleCheckbox}></CheckboxInput>
      <RadioInput onRadioInput={handleRadio}></RadioInput>
      <UploadInput onUploadInput={handleUpload}></UploadInput>
      <p className={popUpClass}>{popUpText}</p>
      <button className="submit-button" onClick={handleErrors}>
        Submit
      </button>
    </div>
  );
}

export default SubmitForm;
