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
        { id: "1", title: "Yoga 101", trainer: "John" },

        {
          id: "2",
          title: "WeightTraining for Beginners",
          trainer: "Harry"
        },
        {
          id: "3",
          title: "Yoga for health",
          trainer: "Mary"
        },
        {
          id: "4",
          title: "Half-Marathon Prep",
          trainer: "Elizabeth"
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
          <CoursesBox searchResults={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default SearchCourses;
