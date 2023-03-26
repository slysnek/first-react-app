import React from "react";

class TextInput extends React.Component<object> {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <div className="submit-text-wrapper">
        <p>Type in a name for the song</p>
        <input type="text" className="submit-text" defaultValue="My Best Song" />
      </div>
    );
  }
}

export default TextInput;
