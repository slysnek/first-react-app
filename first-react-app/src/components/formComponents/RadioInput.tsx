import React, { useEffect, useState } from "react";

function RadioInput(props: { onRadioInput: (arg0: { whoMade: string }) => void }) {
  const [whoMade, setWhoMade] = useState("By me");

  function handleChange(e: { currentTarget: { value: string } }) {
    setWhoMade(e.currentTarget.value);
  }

  useEffect(() => {
    props.onRadioInput({
      whoMade: whoMade,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whoMade]);

  return (
    <div className="submit-radio-wrapper">
      <p>Was the song made by you or by someone else?</p>
      <input
        id="by-me"
        defaultChecked={true}
        name="artist"
        value="By me"
        type="radio"
        className="submit-radio"
        onChange={handleChange}
      />
      <label htmlFor="by-me">By me.</label>
      <input
        id="by-someone"
        name="artist"
        value="By someone else"
        type="radio"
        className="submit-radio"
        onChange={handleChange}
      />
      <label htmlFor="by-someone">Someone else made this song.</label>
    </div>
  );
}

export default RadioInput;
