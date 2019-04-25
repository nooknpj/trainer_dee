import React, { Component } from "react";
import { Button } from "react-bootstrap";
export class MyToggleButton extends Component {
  constructor() {
    super();
    this.state = {
      buttonState: 1
    };
  }

  onClick = e => {
    this.state.buttonState = this.state.buttonState ^ 1;
    console.log(this.state);
    console.log(e.target.id);
    this.getButtonStyle(e);
  };

  getButtonStyle = e => {
    if (this.state.buttonState == 0) {
      console.log(e.target.className);
      e.target.className =
        "toggleButton btn btn-primary btn-success deactivatedButton";
    } else {
      e.target.className = "toggleButton btn btn-primary btn-success ";
    }
  };
  render() {
    return (
      <div>
        <Button
          className="toggleButton btn btn-success btn-primary"
          variant="success"
          id="helloButton"
          onClick={this.onClick}
        >
          {" "}
          Hello
        </Button>
      </div>
    );
  }
}

export default MyToggleButton;
