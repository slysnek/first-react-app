import React, { useEffect, useRef, useState } from "react";

function DateInput(props: { onDateInput: (arg0: { date: string; hasError: boolean }) => void }) {
  const dateInput = useRef<HTMLInputElement>(null);
  const [errorClass, setErrorClass] = useState("error-hidden");
  const [hasError, setHasError] = useState(false);
  const [date, setDate] = useState("2023-01-01");
  const errorText = "You cannot choose the future date";

  function handleError() {
    const inputDate = new Date(dateInput.current!.value);
    if (inputDate > new Date()) {
      setErrorClass("error-visible");
      setHasError(true);
    } else {
      setErrorClass("error-hidden");
      setHasError(false);
      setDate(dateInput.current!.value);
    }
  }

  useEffect(() => {
    props.onDateInput({
      date: date,
      hasError: hasError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasError, date]);

  return (
    <div className="submit-data-wrapper">
      <p>When was this song created?</p>
      <p className={errorClass}>{errorText}</p>
      <input
        defaultValue="2023-01-01"
        ref={dateInput}
        type="date"
        className="submit-data"
        onChange={handleError}
      />
    </div>
  );
}

export default DateInput;
