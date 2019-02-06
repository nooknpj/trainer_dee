import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";
import MyToggleButton from "../components/MyToggleButton";

export class TestCss extends Component {
  render() {
    return (
      <div>
        <MyToggleButton />
      </div>
    );
  }
}
const searchContainerStyle = {
  display: "flex",
  flexDirection: "row"
};

const coursesBoxContainerStyle = {
  backgroundColor: "white"
};
export default TestCss;
