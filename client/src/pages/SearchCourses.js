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

  componentDidMount() {
    localStorage.setItem("currentPage", "searchCourses");
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
      <div className="box">
        <p className="pageHeader"> Search Courses</p>
        {localStorage.getItem("isLoggedIn") == 0 ? (
          // notlogin
          <p>You are not logged in. Please click the "Login" button to login first.</p>
        ) : (
            //login
            <div>


              <div id="searchContainer">
                <SearchBox upDateSearchResults={this.upDateSearchResults} />
              </div>

              <div>
                {/* <div id="resultsContainer"> */}
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
