import React, { Component } from "react";
import CourseItem from "./CourseItem";
export class SearchResults extends Component {
  render() {
    // display the course item for each courseItem
    // in searchResults( passed as props from state of SearchCoursesPage)
    return this.props.searchResults.map(courseItem => (
      <CourseItem
        key={courseItem.id}
        title={courseItem.title}
        trainer={courseItem.trainer}
      />
    ));
  }
}

export default SearchResults;
