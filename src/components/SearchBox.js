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

  componentDidMount() {
    this.getDefaultSearchResults();
  }

  async getDefaultSearchResults() {
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

      this.props.upDateSearchResults(results);
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async fetchFilterdService(e) {
    try {
      const data = this.state.serviceFilter;
      //const data = { Service: e.target.value };
      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/filter_by_service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      // this.setState({
      //     tripTable: []
      // })
      // const response = await fetch('/dplop/list_trip')
      const results = await response.json();
      console.log(results);
      let tmp = [
        {
          CourseID: "5",
          CName: "yoga mockUp",
          Service: "1",
          CourseDescription: "hello",
          Cost: "500",
          TrainerID: "112",
          CourseHour: "300000",
          ImageUrl: "course Image Url"
        }
      ];
      // this.props.upDateSearchResults(tmp);
      this.props.upDateSearchResults(results);

      // await this.setState({ tripTable: results });
      // this.setState({
      //   list_trip_dateTB: ''
      // })
    } catch (error) {
      console.log("Filter failed", error);
    }
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
    let x = [
      {
        id: "1",
        title: "Update1",
        trainer: "John",
        hours: "10",
        price: "3000",
        imgUrl: "imgHere"
      },

      {
        id: "2",
        title: "Update",
        trainer: "Harry",
        hours: "10",
        price: "2500",
        imgUrl: "imgHere"
      }
    ];
    this.props.upDateSearchResults(x);
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

    this.fetchFilterdService(e);

    // this.props.upDateSearchResults(tmp);
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

export default SearchBox;
