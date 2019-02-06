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

  // default search result after starts
  componentDidMount() {
    this.getDefaultSearchResults();
    //this.getMockUpResult();
  }

  getMockUpResult() {
    this.props.upDateSearchResults(mockUpResult);
  }

  async getDefaultSearchResults() {
    try {
      const data = this.state;
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/search_filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  //new fetch search results (service+gender)
  async fetchFilterSearch(e) {
    try {
      const data = this.state;
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/search_filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      console.log(results);

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("Service Filter failed", error);
    }
  }

  // handle service filter click
  onServiceFilterClick = e => {
    e.target.value = e.target.value ^ 1;
    if (e.target.value == 0) {
      this.state.serviceFilter[e.target.title] = 0;
    } else {
      this.state.serviceFilter[e.target.title] = 1;
    }

    //this.fetchFilterService(e);
    this.fetchFilterSearch(e);
    console.log(this.state);
  };

  // fetch results from back-end after service filter change
  // and call updateSearchResults
  async fetchFilterService(e) {
    try {
      const data = this.state.serviceFilter;
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/filter_by_service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      console.log(results);

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("Service Filter failed", error);
    }
  }

  // handle gender filter click
  onGenderFilterClick = e => {
    e.target.value = e.target.value ^ 1;
    if (e.target.value == 0) {
      this.state.genderFilter[e.target.title] = 0;
    } else {
      this.state.genderFilter[e.target.title] = 1;
    }
    //this.fetchFilterGender(e);
    this.fetchFilterSearch(e);
    console.log(this.state);
  };
  // fetch results from back-end after gender filter change
  // and call updateSearchResults
  async fetchFilterGender(e) {
    try {
      const data = this.state.genderFilter;
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/filter_by_gender", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      console.log(results);

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("Gender filter failed", error);
    }
  }

  //capture keyword change in searchBar
  onSearchBarChange = e => {
    this.setState({ searchKeyWords: e.target.value });
    console.log(e.target.value);
    let tmp = {
      keyword: e.target.value
    };
    console.log(tmp);
  };

  // submit button currently not used
  onSearchSubmit = e => {
    e.preventDefault();
    console.log(this.state);
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
              title="cardio"
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

const mockUpResult = [
  {
    cName:
      "Default SearchResults is currently not fetching post request to backend",
    cost: "3000",
    imageUrl: " yoga image here ",
    courseHour: "10",
    fName: "Jamie",
    sName: "Jamie2",
    service: "0",
    courseDescription: "yoga mock up"
  },
  {
    cName: "This is from array of object (const mockUpResult) in SearchBox.js",
    cost: "99999999",
    imageUrl: " yoga image here ",
    courseHour: "120",
    fName: "Jamie",
    sName: "Jamie2",
    service: "0",
    courseDescription: "yoga for rich people"
  },
  {
    cName: "ZZZZZZZZ",
    cost: "0",
    imageUrl: " IMG HERE ",
    courseHour: "2",
    fName: "Kelsey",
    sName: "NNNNNN",
    service: "1",
    courseDescription: "quick cardio"
  },
  {
    cName: "WeightTraining 21102345",
    cost: "7",
    imageUrl: " IMG HERE ",
    courseHour: "1000000",
    fName: "Kelsey",
    sName: "NNNNNN",
    service: "2",
    courseDescription: "weight training for life"
  },
  {
    cName: "a",
    cost: "2",
    imageUrl: " IMG HERE ",
    courseHour: "1000000",
    fName: "Kelsey",
    sName: "NNNNNN",
    service: "2",
    courseDescription: "weight training for life"
  },
  {
    cName: "A",
    cost: "7",
    imageUrl: " IMG HERE ",
    courseHour: "1000000",
    fName: "Kelsey",
    sName: "NNNNNN",
    service: "2",
    courseDescription: "weight training for life"
  }
];
export default SearchBox;
