import React from "react";

class UploadInput extends React.Component<object, { pic: string | undefined }> {
  uploadInput: React.RefObject<HTMLInputElement>;
  constructor(props: object) {
    super(props);
    this.uploadInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pic: "",
    };
  }

  handleChange(e: { target: { files: FileList | null } }) {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      this.setState({
        pic: URL.createObjectURL(img),
      });
    }
  }

  render() {
    return (
      <div className="submit-upload-wrapper">
        <p>Upload a picture for this song</p>
        <input
          ref={this.uploadInput}
          onChange={this.handleChange}
          type="file"
          accept=".png,.jpg,.gif"
          className="submit-upload"
        />
      </div>
    );
  }
}

export default UploadInput;
