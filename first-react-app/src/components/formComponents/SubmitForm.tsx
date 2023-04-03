import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      songName: "Best Song In The World",
      date: "2023-01-01",
      select: "1",
      checkbox: false,
      radio: null,
      upload: FileList,
    },
  });

  function handleErrors(data: {
    songName: string;
    date: string;
    select: string;
    checkbox: boolean;
    radio: null;
    upload: FileList;
  }) {
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
      const formDataTest = [
        data.songName,
        data.date,
        data.select,
        data.checkbox.toString(),
        data.radio as unknown as string,
        URL.createObjectURL(data.upload[0]),
      ];
      console.log(formData);
      props.isFormCorrect(formDataTest);
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

  const handleInputChanges = (event: { target: { value: string } }) => {
    const value = event.target.value;
    console.log(value);
    setValue("select", value);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        handleErrors(data);
      })}
      className="submit-wrapper"
    >
      <input
        {...register("songName", {
          required: true,
          minLength: { value: 4, message: "Song name must be at least 4 symbols" },
        })}
      />
      <p className="error-visible">{errors.songName?.message}</p>
      <input
        type="date"
        {...register("date", {
          required: true,
          validate: (value) => {
            const inputDate = new Date(value);
            const currDate = new Date();
            return inputDate > currDate ? "You cannot choose the future date" : true;
          },
        })}
      />
      <p className="error-visible">{errors.date?.message}</p>
      <select
        {...register("select", {
          onBlur: handleInputChanges,
          required: true,
        })}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <label htmlFor="checkbox">
        Does this song has implicit content?
        <input id="checkbox" type="checkbox" {...register("checkbox")} />
      </label>
      <label htmlFor="radio-1">
        By me
        <input
          id="radio-1"
          value="By me"
          type="radio"
          {...register("radio", { required: "Need to choose one option" })}
        />
      </label>
      <label htmlFor="radio-2">
        By someone else
        <input
          id="radio-2"
          value="By someone else"
          type="radio"
          {...register("radio", { required: "Need to choose one option" })}
        />
      </label>
      <p className="error-visible">{errors.radio?.message}</p>
      <input type="file" accept=".png,.jpg,.gif" {...register("upload")} />
      {/*       <TextInput onTextInput={handleText}></TextInput>
      <DateInput onDateInput={handleDate}></DateInput>
      <SelectInput onSelectInput={handleSelect}></SelectInput>
      <CheckboxInput onCheckboxInput={handleCheckbox}></CheckboxInput>
      <RadioInput onRadioInput={handleRadio}></RadioInput>
      <UploadInput onUploadInput={handleUpload}></UploadInput> */}
      <p className={popUpClass}>{popUpText}</p>
      <button type="submit" className="submit-button" /* onClick={handleErrors} */>
        Submit
      </button>
    </form>
  );
}

export default SubmitForm;
