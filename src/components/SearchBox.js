import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import MyToggleButton from "../components/MyToggleButton";
import "../css/searchBox.css";
import Geosuggest from "react-geosuggest";

const google = window.google;

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
      },

      searchLocation: {
        lat: 0,
        lng: 0
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
      // console.log(results);

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("Service Filter failed", error);
    }
  }

  // fetch results from back-end after search location change
  // and call updateSearchResults
  async fetchSearchLocation(e) {
    try {
      const data = e;
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/search_location", {
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
      console.log("Location search failed", error);
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
    console.log("hey");
    this.getServiceFilterStyle(e);
  };

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
    console.log("hey!");
    this.getGenderFilterStyle(e);
  };

  //capture keyword change in searchBar
  onSearchBarChange = e => {
    this.state.searchKeyWords = e.target.value;
    this.fetchFilterSearch(e);
  };

  //Select suggest location keyword
  onSuggestSelect = suggest => {
    if (typeof suggest !== "undefined") {
      console.log(suggest.location);
      this.setState({ searchLocation: suggest.location });
      this.fetchSearchLocation(suggest.location);
    } else {
      this.getDefaultSearchResults();
    }
  };

  //Check if no location suggestion
  onSuggestNoResults(userInput) {
    //TO DO: SHOW NO SEARCH RESULT OR SHOW DEFAULT ITEM?
    console.log("onSuggestNoResults for :" + userInput);
  }

  //-------------------------------------------------------UPDATE TOGGLE BUTTON STYLE--------------------------------------------------
  getServiceFilterStyle = e => {
    e.preventDefault();
    let thisButtonState = this.state.serviceFilter[e.target.title];
    if (thisButtonState) {
      e.target.className = "toggleButton btn btn-primary btn-success ";
    } else {
      e.target.className =
        "toggleButton btn btn-primary btn-success deactivatedButton";
    }
    console.log(thisButtonState);
  };

  getGenderFilterStyle = e => {
    e.preventDefault();
    let thisButtonState = this.state.genderFilter[e.target.title];
    if (thisButtonState) {
      e.target.className = "toggleButton btn btn-primary btn-success ";
    } else {
      e.target.className =
        "toggleButton btn btn-primary btn-success deactivatedButton";
    }
    console.log(thisButtonState);
  };
  //-----------------------------------------------------END UPDATE TOGGLE BUTTON STYLE--------------------------------------------------
  render() {
    return (
      <div className="searchContainer">
        <Form id="searchForm">
          <FormControl
            id="searchBar"
            type="text"
            placeholder="Search..."
            className="mr-sm-2"
            onChange={this.onSearchBarChange}
          />
          {/* <Button onClick={this.onSearchSubmit}>Submit</Button> */}
        </Form>

        <div className="allFilterContainer">
          <div className="filterContainer">
            <div className="filterName">
              <a>Service</a>
            </div>

            <div className="filterChoicesContainer">
              <Button
                title="yoga"
                value={1}
                className="toggleButton btn btn-success btn-primary"
                onClick={this.onServiceFilterClick}
                type="serviceFilter"
              >
                Yoga
              </Button>

              <Button
                title="cardio"
                value={1}
                className="toggleButton btn btn-success btn-primary"
                onClick={this.onServiceFilterClick}
              >
                Cardio
              </Button>

              <Button
                title="weightTraining"
                value={1}
                className="toggleButton btn btn-success btn-primary"
                onClick={this.onServiceFilterClick}
              >
                Weight Training
              </Button>
            </div>
          </div>

          <div className="filterContainer">
            <div className="filterNameContainer">
              <div className="filterName" style={{ width: "70%" }}>
                <a>Trainer's Gender</a>
              </div>
            </div>

            <div className="filterChoicesContainer">
              <Button
                className="toggleButton btn btn-success btn-primary"
                title="male"
                value={1}
                onClick={this.onGenderFilterClick}
              >
                {" "}
                Male{" "}
              </Button>

              <Button
                className="toggleButton btn btn-success btn-primary"
                title="female"
                value={1}
                onClick={this.onGenderFilterClick}
              >
                {" "}
                Female{" "}
              </Button>

              <Button
                className="toggleButton btn btn-success btn-primary"
                title="others"
                value={1}
                onClick={this.onGenderFilterClick}
              >
                {" "}
                Others{" "}
              </Button>
            </div>
          </div>
          <div className="locationFilterContainer">
            <div className="filterNameContainer">
              <div
                className="filterName"
                style={{ width: "40%", minWidth: "300px" }}
              >
                <a>Course Location</a>
              </div>
            </div>

            <div className="geosuggest__input-wrapper">
              <Geosuggest
                ref={el => (this._geoSuggest = el)}
                placeholder="Location.."
                fixtures={exampleLocations}
                onSuggestSelect={this.onSuggestSelect}
                onSuggestNoResults={this.onSuggestNoResults}
                location={new google.maps.LatLng(1, 1)}
                radius="20"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const exampleLocations = [
  {
    label: "BTS หมอชิต",
    location: { lat: 13.8022855, lng: 100.55383099999995 }
  },
  {
    label: "สยามพารากอน",
    location: { lat: 13.7461123, lng: 100.53410770000005 }
  },
  {
    label: "Fitness First - CentralPlaza Grand Rama9",
    location: { lat: 13.7593369, lng: 100.56665410000005 }
  }
];

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
