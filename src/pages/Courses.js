import React, { Component } from "react";
import CoursesBox from "../components/CoursesBox";
import SearchBox from "../components/SearchBox";
import { Container } from "react-bootstrap";
export class Courses extends Component {
  render() {
    return (
      <div>
        <SearchBox />

        <CoursesBox />
      </div>
    );
  }
}

export default Courses;
