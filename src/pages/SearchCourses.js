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
      <div className="pageContainerDiv">
        {localStorage.getItem("isLoggedIn") == 0 ? (
          // notlogin
          <p>'you are not logged in'</p>
        ) : (
          //login
          <div>
            {/* <p style={pageTitleStyle}> Search Courses</p> */}

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

const pageTitleStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "20%",
  minWidth: "250px",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold",
  marginLeft: "50px"
};
export default SearchCourses;
