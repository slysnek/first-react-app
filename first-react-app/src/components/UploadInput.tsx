import React from "react";

class UploadInput extends React.Component<object> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="submit-upload-wrapper">
        <p>Upload a picture for this song</p>
        <input type="file" accept=".png,.jpg,.gif" className="submit-upload" />
      </div>
    );
  }
}

export default UploadInput;
