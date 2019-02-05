import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";
import { Button } from "react-bootstrap";

export class TestCss extends Component {
  constructor() {
    super();
    this.state = {
      buttonStlye: 1
    };
  }

  getButtonStyle = () => {
    if (this.state.buttonStlye == 1) {
      return {
        backgroundColor: "blue"
      };
    } else {
      return {
        backgroundColor: "yellow"
      };
    }
  };
  render() {
    return (
      <div style={divStyle}>
        <Button style={this.getButtonStyle} type="checkbox">
          {" "}
          testButton
        </Button>
      </div>
    );
  }
}

const divStyle = {
  padding: "50px"
};
const searchContainerStyle = {
  display: "flex",
  flexDirection: "row"
};

const coursesBoxContainerStyle = {
  backgroundColor: "white"
};
export default TestCss;
