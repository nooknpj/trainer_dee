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
        {
          id: "1",
          title: "Yoga 101",
          trainer: "John",
          hours: "10",
          price: "3000",
          imgUrl: "imgHere"
        },

        {
          id: "2",
          title: "WeightTraining for Beginners",
          trainer: "Harry",
          hours: "10",
          price: "2500",
          imgUrl: "imgHere"
        },
        {
          id: "3",
          title: "Yoga for health",
          trainer: "Mary",
          hours: "5",
          price: "1200",
          imgUrl: "imgHere"
        },
        {
          id: "4",
          title: "Half-Marathon Prep",
          trainer: "Elizabeth",
          hours: "20",
          price: "3000",
          imgUrl: "imgHere"
        }
      ]
    };
  }

  // functions -> need to be passed via props to inner components

  // upDateSearchResults (parameters) then call backend
  upDateSearchResults = e => {
    this.setState({
      searchResults: e
    });
  };

  render() {
    console.log(this.state);
    return (
      <div id="searchCoursesContainer">
        <div id="searchContainer">
          <SearchBox upDateSearchResults={this.upDateSearchResults} />
        </div>

        <div id="resultsContainer">
          <CoursesBox searchResults={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default SearchCourses;
