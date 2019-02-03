import React, { Component } from "react";
import SearchResults from "./SearchResults";

export class CoursesBox extends Component {
  render() {
    return (
      <div id="coursesBox">
        <div id="sortBarContainer">
          <h> sort bar goes here</h>
        </div>

        <SearchResults />
      </div>
    );
  }
}

export default CoursesBox;
