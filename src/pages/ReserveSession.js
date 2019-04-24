import React, { Component } from "react";
import { Dropdown, DropdownButton, Button } from "react-bootstrap";

class ReserveSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerTimeTable: []
    };
  }

  componentDidMount() {
    // this.getTrainerTimeTable();
    console.log(this.state.trainerTimeTable);
  }

  async getTrainerID() {
    try {
      let data = { transactionID: sessionStorage.getItem("transactionID") };
      const response = await fetch("/trainer_dee/get_trainer_timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      console.log(results);
      this.setState({
        trainerTimeTable: results
      });
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerTimeTable() {
    try {
      let data = { transactionID: sessionStorage.getItem("transactionID") };
      const response = await fetch("/trainer_dee/get_trainer_timetable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      console.log(results);
      this.setState({
        trainerTimeTable: results
      });
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  // async getOnGoingCourse() {
  //     try {
  //         let data = { clientID: localStorage.getItem("clientID") };
  //         const response = await fetch("/trainer_dee/get_ongoing_course", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json"
  //             },
  //             body: JSON.stringify(data)
  //         });

  //         const results = await response.json();
  //         this.setState({
  //             onGoingCourse: results
  //         });
  //     } catch (error) {
  //         console.log("defaultFetchError : ", error);
  //     }
  // }

  render() {
    return (
      <div className="box">
        {console.log(sessionStorage.getItem("transactionID"))}
        <p className="pageHeader">Reserve Session</p>
        <p> {sessionStorage.getItem("transactionID")}</p>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <DropdownButton
            id="dropdown-basic-button"
            title="Select date"
            style={{ marginRight: "30px" }}
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            title="Select duration"
            style={{ marginRight: "30px" }}
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <DropdownButton
            id="dropdown-basic-button"
            title="Select time"
            style={{ marginRight: "30px" }}
          >
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
          <Button
            variant="primary"
            size="small"
            type="submit"
            style={{ marginLeft: "auto" }}
          >
            Reserve
          </Button>
        </div>
      </div>
    );
  }
}

export default ReserveSession;
