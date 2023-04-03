import React, { useEffect, useRef, useState } from "react";

function SelectInput(props: { onSelectInput: (arg0: { rating: string }) => void }) {
  const [rating, setRating] = useState("1");

  const selectInput = useRef<HTMLSelectElement>(null);

  function handleChange() {
    setRating(selectInput.current!.value);
  }

  useEffect(() => {
    props.onSelectInput({
      rating: rating,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <div className="submit-select-wrapper">
      <p>Rate the song from 1 to 10</p>
      <select ref={selectInput} onChange={handleChange} name="rating" className="submit-select">
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
    </div>
  );
}

export default SelectInput;
