import React from "react";

class CheckboxInput extends React.Component<object, { checked: string | undefined }> {
  checkboxInput: React.RefObject<HTMLInputElement>;
  constructor(props: object) {
    super(props);
    this.checkboxInput = React.createRef();
    this.state = {
      checked: "false",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      checked: this.checkboxInput.current?.checked.toString(),
    });
  }
  render() {
    return (
      <div className="submit-checkbox-wrapper">
        <label htmlFor="has-explicit-content">
          Check the mark if the song has explicit content.
        </label>
        <input
          ref={this.checkboxInput}
          id="has-explicit-content"
          type="checkbox"
          className="submit-checkbox"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default CheckboxInput;
