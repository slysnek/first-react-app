import React from "react";

class TextInput extends React.Component<
  object,
  { errorClass: string; errorText: string; hasError: boolean; text: string | undefined }
> {
  textInput: React.RefObject<HTMLInputElement>;
  constructor(props: object) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      errorClass: "error-hidden",
      errorText: "The name of the song must be at least 4 characters long",
      hasError: false,
      text: "My Best Song",
    };
    this.handleError = this.handleError.bind(this);
  }

  handleError() {
    if (this.textInput.current!.value.length < 4) {
      this.setState({
        errorClass: "error-visible",
        hasError: true,
      });
    } else {
      this.setState({
        errorClass: "error-hidden",
        hasError: false,
        text: this.textInput.current?.value,
      });
    }
  }

  render() {
    return (
      <div className="submit-text-wrapper">
        <p>Type in a name for the song</p>
        <p className={this.state.errorClass}>{this.state.errorText}</p>
        <input
          type="text"
          ref={this.textInput}
          className="submit-text"
          defaultValue="My Best Song"
          onBlur={this.handleError}
        />
      </div>
    );
  }
}

export default TextInput;
