import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
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
        <p>filters go here</p>
        <p>filters go here</p>
        <p>filters go here</p>
      </div>
    );
  }
}

export default SearchBox;
