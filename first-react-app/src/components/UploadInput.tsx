import React from "react";

class UploadInput extends React.Component<object, { pic: string | undefined }> {
  constructor(props: object) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pic: "",
    };
  }

  handleChange(e: { currentTarget: { value: string } }) {
    console.log(e.currentTarget.value);
    this.setState({
      pic: e.currentTarget.value,
    });
  }

  render() {
    return (
      <div className="submit-upload-wrapper">
        <p>Upload a picture for this song</p>
        <input
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
