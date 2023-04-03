import React, { useEffect, useRef, useState } from "react";

function CheckboxInput(props: { onCheckboxInput: (arg0: { checked: boolean }) => void }) {
  const [checked, setChecked] = useState(false);
  const checkboxInput = useRef<HTMLInputElement>(null);

  function handleChange() {
    setChecked(checkboxInput.current!.checked);
  }

  useEffect(() => {
    props.onCheckboxInput({
      checked: checked,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div className="submit-checkbox-wrapper">
      <label htmlFor="has-explicit-content">Check the mark if the song has explicit content.</label>
      <input
        ref={checkboxInput}
        id="has-explicit-content"
        type="checkbox"
        className="submit-checkbox"
        onChange={handleChange}
      />
    </div>
  );
}

export default CheckboxInput;
