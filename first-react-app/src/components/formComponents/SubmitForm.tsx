import React, { useState } from "react";
import { useForm } from "react-hook-form";

export interface IFormData {
  (a: string[]): void;
}

function SubmitForm(props: { isFormCorrect: (arg0: string[]) => void }) {
  const [popUpClass, setpopUpClass] = useState("error-hidden");
  const [popUpText, setpopUpText] = useState("You have errors in form. Please correct them.");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      songName: "Best Song In The World",
      date: "2023-01-01",
      select: "1",
      checkbox: false,
      radio: null,
      upload: null,
    },
  });

  function handleData(data: {
    songName: string;
    date: string;
    select: string;
    checkbox: boolean;
    radio: null;
    upload: null | FileList;
  }) {
    const isTextWrong = errors.songName;
    const isDateWrong = errors.date;

    if (isTextWrong || isDateWrong) {
      setpopUpClass("error-visible");
      setpopUpText("You have errors in form. Please correct them.");
    } else {
      setpopUpClass("confirm-visible");
      setpopUpText("You have successfully created a card.");

      let image = "";

      try {
        image = URL.createObjectURL(data.upload![0]);
      } catch (error) {
        image = "";
      } finally {
        const formData = [
          data.songName,
          data.date,
          data.select,
          data.checkbox.toString(),
          data.radio as unknown as string,
          image,
        ];
        props.isFormCorrect(formData);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        handleData(data);
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
      <p className={popUpClass}>{popUpText}</p>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
}

export default SubmitForm;
