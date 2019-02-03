import React, { Component } from "react";
import { FormCheck, Form, FormControl, Button } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
export class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyWords: ""
    };
  }

  //capture keyword change in searchBar
  onChange = e => {
    this.setState({ searchKeyWords: e.target.value });
    // onKeyWordChange should called this.props.upDateSearchResults() (with parameters)
  };

  // this is currently a mock up function
  // onSubmit (parameters) call backend to updateSearchResults
  onSubmit = e => {
    //console.log("submit");
    console.log("this current keyword is");
    console.log(this.state.searchKeyWords);
    this.props.upDateSearchResults();
    e.preventDefault();
  };

  render() {
    return (
      <div id="searchBox">
        <Form id="searchForm">
          <FormControl
            id="searchBar"
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            onChange={this.onChange}
          />
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>

        <div className="filterContainer">
          <div className="filterNameContainer">
            <div className="filterName">
              <a>Service</a>
            </div>
          </div>

          <div>
            <Button className="filterChoices"> Yoga </Button>
            <Button className="filterChoices"> Cardio </Button>
            <Button className="filterChoices"> Weight Training </Button>
          </div>
        </div>

        <div className="filterContainer">
          <div className="filterNameContainer">
            <div className="filterName">
              <a>Location</a>
            </div>
          </div>

          <div>
            <Button className="filterChoices"> BTS </Button>
            <Button className="filterChoices"> MRT </Button>
            <Button className="filterChoices"> SIAM </Button>
            <Button className="filterChoices"> ASOK </Button>
            <Button className="filterChoices"> MOCHIT </Button>
            <Button className="filterChoices"> RAMA IX </Button>
          </div>
        </div>

        <div className="filterContainer">
          <div className="filterNameContainer">
            <div className="filterName">
              <a>Trainer's Gender</a>
            </div>
          </div>

          <div>
            <Button className="filterChoices"> Male </Button>
            <Button className="filterChoices"> Female </Button>
            <Button className="filterChoices"> Others </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
