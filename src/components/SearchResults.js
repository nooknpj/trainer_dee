import React, { Component } from "react";
import CourseItem from "./CourseItem";
export class SearchResults extends Component {
  componentDidMount() {
    // this.props.searchResults.sort(byName);
  }
  render() {
    // display the course item for each courseItem
    // in searchResults( passed as props from state of SearchCoursesPage)
    return this.props.searchResults.map(courseItem => (
      <CourseItem
        courseID={courseItem.courseID}
        cName={courseItem.cName}
        service={courseItem.service}
        courseDescription={courseItem.courseDescription}
        cost={courseItem.cost}
        fName={courseItem.fName}
        lName={courseItem.lName}
        courseHour={courseItem.courseHour}
        gender={courseItem.gender}
        imageUrl={courseItem.imageUrl}
        rating={courseItem.rating}
      />
    ));
  }
}

function byName(a, b) {
  if (a.cName < b.cName) return -1;
  if (a.cName > b.cName) return 1;
  return 0;
}

export default SearchResults;
