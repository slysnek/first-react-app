import React, { useEffect, useRef, useState } from "react";

function UploadInput(props: { onUploadInput: (arg0: { pic: string }) => void }) {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [pic, setPic] = useState("");

  function handleChange(e: { target: { files: FileList | null } }) {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setPic(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    props.onUploadInput({
      pic: pic,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pic]);

  return (
    <div className="submit-upload-wrapper">
      <p>Upload a picture for this song</p>
      <input
        ref={uploadInput}
        onChange={handleChange}
        type="file"
        accept=".png,.jpg,.gif"
        className="submit-upload"
      />
    </div>
  );
}

export default UploadInput;
