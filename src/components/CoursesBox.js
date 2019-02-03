import React, { Component } from "react";
import SearchResults from "./SearchResults";
import noSearchResultImg from "../img/noSearchResultImg.png";
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

        {/* check if the search results if empty or not 
        if (notEmpty) -> show searchResults Class
        if (empty)    -> show no results message */}

        {this.props.searchResults.length ? (
          <SearchResults searchResults={this.props.searchResults} />
        ) : (
          <div style={noSearchResultMessageStyle}>
            <p> Sorry,</p>
            <p> We couldn't find any course that matches your search.</p>
          </div>
        )}

        <SearchResults searchResults={this.props.searchResults} />
      </div>
    );
  }
}

const noSearchResultMessageStyle = {
  textAlign: "center",
  marginTop: "70px",
  marginBottom: "120px",
  fontSize: "50px",
  fontWeight: "bold"
};

export default CoursesBox;
