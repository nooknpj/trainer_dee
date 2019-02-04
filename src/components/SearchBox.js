import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";

export class SearchBox extends Component {
  constructor() {
    super();
    this.state = {
      searchKeyWords: "",

      serviceFilter: {
        yoga: 1,
        weightTraining: 1,
        cardio: 1
      },

      genderFilter: {
        male: 1,
        female: 1,
        others: 1
      }
    };
  }

  //capture keyword change in searchBar
  onSearchBarChange = e => {
    this.setState({ searchKeyWords: e.target.value });
    console.log(this.state);
    //this.props.upDateSearchResults();
    // onKeyWordChange should called this.props.upDateSearchResults() (this.state should be sent)
  };

  // this is currently a mock up function
  // onSubmit (this.state should be sent) call backend to updateSearchResults
  onSearchSubmit = e => {
    //console.log("submit");
    console.log("this current keyword is");

    this.props.upDateSearchResults();
    e.preventDefault();
    console.log(this.state);
  };

  onServiceFilterClick = e => {
    //console.log(e.target.value);
    //console.log(e.target.id);
    e.target.value = e.target.value ^ 1;
    if (e.target.value == 0) {
      this.state.serviceFilter[e.target.title] = 0;
    } else {
      this.state.serviceFilter[e.target.title] = 1;
    }

    console.log(this.state);
  };

  onGenderFilterClick = e => {
    //console.log(e.target.value);
    //console.log(e.target.id);
    e.target.value = e.target.value ^ 1;
    if (e.target.value == 0) {
      this.state.genderFilter[e.target.title] = 0;
    } else {
      this.state.genderFilter[e.target.title] = 1;
    }

    console.log(this.state);
  };

  //test
  toggleValue = e => {
    e.target.value = e.target.value ^ 1;
    console.log(e.target.value);
  };

  // // get Filter Choice Style
  // // Depends on its props (e.value)
  // getFilterChoiceStyle = () => {
  //   if (this.value == 0) {
  //     return {
  //       background: "#f4f4f4"
  //     };
  //   } else {
  //     return {
  //       background: "#f4f4f4"
  //     };
  //   }
  // };

  render() {
    return (
      <div id="searchBox">
        <Form id="searchForm">
          <FormControl
            id="searchBar"
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            onChange={this.onSearchBarChange}
          />
          <Button onClick={this.onSearchSubmit}>Submit</Button>
        </Form>

        <div className="filterContainer">
          <div className="filterNameContainer">
            <div className="filterName">
              <a>Service</a>
            </div>
          </div>

          <div>
            <Button
              title="yoga"
              value={1}
              className="filterChoices"
              onClick={this.onServiceFilterClick}
            >
              Yoga
            </Button>

            <Button
              id="cardio"
              value={1}
              className="filterChoices"
              onClick={this.onServiceFilterClick}
            >
              Cardio
            </Button>
            <Button
              title="weightTraining"
              value={1}
              className="filterChoices"
              onClick={this.onServiceFilterClick}
            >
              Weight Training
            </Button>
          </div>
        </div>

        <div className="filterContainer">
          <div className="filterNameContainer">
            <div className="filterName">
              <a>Trainer's Gender</a>
            </div>
          </div>

          <div>
            <Button
              className="filterChoices"
              title="male"
              value={1}
              onClick={this.onGenderFilterClick}
            >
              {" "}
              Male{" "}
            </Button>

            <Button
              className="filterChoices"
              title="female"
              value={1}
              onClick={this.onGenderFilterClick}
            >
              {" "}
              Female{" "}
            </Button>

            <Button
              className="filterChoices"
              title="others"
              value={1}
              onClick={this.onGenderFilterClick}
            >
              {" "}
              Others{" "}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
