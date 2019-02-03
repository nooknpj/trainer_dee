import React, { Component } from "react";
import SearchResults from "./SearchResults";

export class CoursesBox extends Component {
  render() {
    // console.log("from cbox");
    // console.log(this.props.searchResults);
    // console.log("from cbox");

    return (
      <div id="coursesBox">
        <div id="sortBarContainer">
          <h> sort bar goes here</h>
        </div>
        <SearchResults searchResults={this.props.searchResults} />
      </div>
    );
  }
}

export default CoursesBox;
