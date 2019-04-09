import React, { Component } from "react";
import SearchResults from "./SearchResults";
import noSearchResultImg from "../img/noSearchResultImg.png";
import { Button, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import "../css/courseBox.css";

export class CoursesBox extends Component {
  constructor() {
    super();
    this.state = {
      sortBy: "cName"
    };
  }

  onRadioButtonClick = e => {
    this.state.sortBy = e.target.value;
    let result = this.props.searchResults;
    let sortParameter = this.state.sortBy;

    if (sortParameter == "cName") {
      result.sort(byName);
    } else if (sortParameter == "courseHour") {
      result.sort(byHours);
    } else if (sortParameter == "cost") {
      result.sort(byCost);
    } else if (sortParameter == "rating") {
      result.sort(byRating);
    }
    this.props.upDateSearchResults(result);
  };

  render() {
    //console.log("from cbox");
    //console.log(this.props.searchResults);
    // console.log("from cbox");

    return (
      <div id="coursesBox">
        <div id="sortBarContainer">
          <p style={sortBarTextStyle}> Sort By </p>

          <Button
            variant="light"
            style={radioButtonStyle}
            value={"rating"}
            onClick={this.onRadioButtonClick}
          >
            {" "}
            Trainer Rating{" "}
          </Button>

          <Button
            variant="light"
            style={radioButtonStyle}
            value={"cName"}
            onClick={this.onRadioButtonClick}
          >
            {" "}
            Course Name{" "}
          </Button>
          <Button
            variant="light"
            style={radioButtonStyle}
            value={"courseHour"}
            onClick={this.onRadioButtonClick}
          >
            {" "}
            Course Duration{" "}
          </Button>
          <Button
            variant="light"
            style={radioButtonStyle}
            value={"cost"}
            onClick={this.onRadioButtonClick}
          >
            {" "}
            Course Cost{" "}
          </Button>
        </div>

        {/* check if the search results if empty or not 
        if (notEmpty) -> show searchResults Class
        if (empty)    -> show no results message */}
        {/* {console.log("sort here")} */}

        {this.props.searchResults.length ? (
          <SearchResults searchResults={this.props.searchResults} />
        ) : (
          <div style={noSearchResultMessageStyle}>
            <p> Sorry,</p>
            <p> We couldn't find any course that matches your search.</p>
          </div>
        )}
      </div>
    );
  }
}

// sort By(s)
function byName(a, b) {
  if (a.cName < b.cName) return -1;
  if (a.cName > b.cName) return 1;
  return 0;
}
function byHours(a, b) {
  if (parseInt(a.courseHour) < parseInt(b.courseHour)) return -1;
  if (parseInt(a.courseHour) > parseInt(b.courseHour)) return 1;
  return 0;
}
function byCost(a, b) {
  if (parseInt(a.cost) < parseInt(b.cost)) return -1;
  if (parseInt(a.cost) > parseInt(b.cost)) return 1;
  return 0;
}
function byRating(a, b) {
  if (parseInt(a.rating) > parseInt(b.rating)) return -1;
  if (parseInt(a.rating) < parseInt(b.rating)) return 1;
  return 0;
}

const noSearchResultMessageStyle = {
  textAlign: "center",
  marginTop: "70px",
  marginBottom: "120px",
  fontSize: "50px",
  fontWeight: "bold"
};

const sortBarTextStyle = {
  marginLeft: "10px",
  marginRight: "10px",
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "1.5em"
};

const radioButtonStyle = {
  marginLeft: "10px",
  marginRight: "10px",
  borderRadius: "10px",
  fontWeight: "bold",
  marginTop: "0.2em"
};

export default CoursesBox;
