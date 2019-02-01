import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";

export class TestCss extends Component {
  render() {
    return (
      <div style={searchContainerStyle}>
        <SearchBox />

        <CoursesBox />
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
