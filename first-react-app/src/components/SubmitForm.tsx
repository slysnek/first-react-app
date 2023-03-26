import React from "react";
import CheckboxInput from "./CheckboxInput";
import DateInput from "./DateInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import UploadInput from "./UploadInput";

class SubmitForm extends React.Component<object> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="submit-wrapper">
        <TextInput></TextInput>
        <DateInput></DateInput>
        <SelectInput></SelectInput>
        <CheckboxInput></CheckboxInput>
        <RadioInput></RadioInput>
        <UploadInput></UploadInput>
        <button className="submit-button">Submit</button>
      </div>
    );
  }
}

export default SubmitForm;
