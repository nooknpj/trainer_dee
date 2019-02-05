import React, { Component } from "react";
import CourseItem from "./CourseItem";
export class SearchResults extends Component {
  render() {
    // display the course item for each courseItem
    // in searchResults( passed as props from state of SearchCoursesPage)
    return this.props.searchResults.map(courseItem => (
      <CourseItem
        CourseID={courseItem.CourseID}
        CName={courseItem.CName}
        Service={courseItem.Service}
        CourseDescription={courseItem.CourseDescription}
        Cost={courseItem.Cost}
        TrainerID={courseItem.TrainerID}
        CourseHour={courseItem.CourseHour}
        ImageUrl={courseItem.Image}
      />
    ));
  }
}

export default SearchResults;
