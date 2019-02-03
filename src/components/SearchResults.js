import React, { Component } from "react";
import CourseItem from "./CourseItem";
export class SearchResults extends Component {
  render() {
    return (
      <div id="searchResults">
        <CourseItem title={"course1"} />
        <CourseItem title={"course2"} />
        <CourseItem title={"course3"} />
      </div>
    );
  }
}

export default SearchResults;
