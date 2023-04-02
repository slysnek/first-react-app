import React, { useRef, useState } from "react";

function TextInput(props: { onTextInput: (arg0: { text: string; hasError: boolean }) => void }) {
  const [errorClass, setErrorClass] = useState("error-hidden");
  const [hasError, setHasError] = useState(false);
  const [text, setText] = useState("Best Song");
  const errorText = "The name of the song must be at least 4 characters long";

  const textInput = useRef<HTMLInputElement>(null);

  function handleError() {
    if (textInput.current!.value.length < 4) {
      setErrorClass("error-visible");
      setHasError(true);
    } else {
      setErrorClass("error-hidden");
      setHasError(false);
      setText(textInput.current!.value);
    }
    props.onTextInput({
      text: text,
      hasError: hasError,
    });
  }

  return (
    <div className="submit-text-wrapper">
      <p>Type in a name for the song</p>
      <p className={errorClass}>{errorText}</p>
      <input
        type="text"
        ref={textInput}
        className="submit-text"
        defaultValue="Best Song"
        onKeyUp={handleError}
      />
    </div>
  );
}

export default TextInput;
