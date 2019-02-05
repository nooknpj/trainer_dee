import React, { Component } from "react";
import CourseItem from "./CourseItem";
export class SearchResults extends Component {
  render() {
    // display the course item for each courseItem
    // in searchResults( passed as props from state of SearchCoursesPage)
    return this.props.searchResults.map(courseItem => (
      <CourseItem
        cName={courseItem.cName}
        service={courseItem.service}
        courseDescription={courseItem.courseDescription}
        cost={courseItem.cost}
        trainerName={courseItem.fName}
        trainerSName={courseItem.sName}
        courseHour={courseItem.courseHour}
        gender={courseItem.gender}
        imageUrl={courseItem.imageUrl}
      />
    ));
  }
}

export default SearchResults;
