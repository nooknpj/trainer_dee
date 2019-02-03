import React, { Component } from "react";
import CoursesBox from "../components/CoursesBox";
import SearchBox from "../components/SearchBox";
import { Container } from "react-bootstrap";
export class SearchCourses extends Component {
  constructor() {
    super();
    // mockup courses from searchResults
    this.state = {
      searchResults: [
        { id: "1", courseName: "Yoga 101", trainer: "John" },

        {
          id: "2",
          courseName: "WeightTraining for Beginners",
          trainer: "Harry"
        },
        {
          id: "3",
          courseName: "Yoga for health",
          trainer: "Mary"
        }
      ]
    };
  }

  render() {
    console.log(this.state);
    return (
      <div id="searchCoursesContainer">
        <div id="searchContainer">
          <SearchBox />
        </div>

        <div id="resultsContainer">
          <CoursesBox />
        </div>
      </div>
    );
  }
}

export default SearchCourses;
