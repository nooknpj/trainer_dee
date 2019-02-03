import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
export class SearchBox extends Component {
  render() {
    return (
      <div id="searchBox">
        <Form id="searchForm">
          <FormControl
            id="searchBar"
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
          />
          <Button>Submit</Button>
        </Form>
        <p>filters go here</p>
        <p>filters go here</p>
        <p>filters go here</p>
      </div>
    );
  }
}

export default SearchBox;
