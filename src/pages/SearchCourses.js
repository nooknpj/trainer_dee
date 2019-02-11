import React, { Component } from "react";
import CoursesBox from "../components/CoursesBox";
import SearchBox from "../components/SearchBox";
import { Container } from "react-bootstrap";
import "../css/searchCoursesPage.css";
export class SearchCourses extends Component {
  constructor() {
    super();
    // mockup courses from searchResults
    this.state = {
      searchResults: []
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
    //console.log(this.state);
    return (

     <div>
       {localStorage.getItem("isLoggedIn") == 0 ? (
              // notlogin
              <p>'you are not logged in'</p>
            ) : (
              //login
              <div id="searchCoursesContainer">
        <div id="searchContainer">
          <SearchBox upDateSearchResults={this.upDateSearchResults} />
        </div>

        <div id="resultsContainer">
          <CoursesBox
            searchResults={this.state.searchResults}
            upDateSearchResults={this.upDateSearchResults}
          />
        </div>
      </div>
            )}
    </div>
            
      
    );
  }
}

export default SearchCourses;
