import React, { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

function SubmitForm(props: { isFormCorrect: (arg0: string[]) => void }) {
  const [popUpClass, setpopUpClass] = useState("error-hidden");
  const [popUpText, setpopUpText] = useState("You have errors in form. Please correct them.");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    formState: { isSubmitSuccessful },
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        songName: "Best Song In The World",
        date: "2023-01-01",
        select: "1",
        checkbox: false,
        radio: null,
        upload: null,
      });
    }
  }, [reset, isSubmitSuccessful]);

  function handleErrors(
    errors: FieldErrors<{
      songName: string;
      date: string;
      select: string;
      checkbox: boolean;
      radio: null;
      upload: null;
    }>
  ) {
    console.log(errors);
    const isTextWrong = errors.songName;
    const isDateWrong = errors.date;
    const isRadioWrong = errors.radio;

    if (isTextWrong || isDateWrong || isRadioWrong) {
      setpopUpClass("error-visible");
      setpopUpText("You have to correct errors in form first only then you can submit.");
    }
  }

  function handleData(data: {
    songName: string;
    date: string;
    select: string;
    checkbox: boolean;
    radio: null;
    upload: null | FileList;
  }) {
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
      setpopUpClass("confirm-visible");
      setpopUpText("You have successfully created a card.");
      props.isFormCorrect(formData);
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
      <p>Type in a name for the song</p>
      <input
        {...register("songName", {
          required: true,
          minLength: { value: 4, message: "Song name must be at least 4 symbols" },
        })}
      />
      <p className="error">{errors.songName?.message}</p>
      <p>When was this song created?</p>
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
      <p className="error">{errors.date?.message}</p>
      <p>Rate the song from 1 to 10</p>
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
      <p>Was the song made by you or by someone else?</p>
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
      <p className="error">{errors.radio?.message}</p>
      <input type="file" accept=".png,.jpg,.gif" {...register("upload")} />
      <p className={`error ${popUpClass}`}>{popUpText}</p>
      <button type="submit" className="submit-button" onClick={() => handleErrors(errors)}>
        Submit
      </button>
    </form>
  );
}

export default SubmitForm;
