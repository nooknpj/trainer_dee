import React, { Component } from "react";
import { Dropdown, DropdownButton, Button, Form } from "react-bootstrap";

Date.prototype.AddDays = function(days) {
  days = parseInt(days, 10);
  return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * days);
};
class ReserveSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerTimeTable: [],
      trainerTimeTableByDate: [],
      remainingHour: 0,
      targetDate: "",
      targetEndDate: "",
      trainerID: "defaultTrainerID",
      targetDateList: [],
      targetDateString: []
    };
  }

  componentDidMount() {
    this.getInfoForReservation();
    this.getTargetDateList();

    console.log(this.state);
    console.log(this.state.trainerTimeTable);
  }

  async getInfoForReservation() {
    try {
      let data = { transactionID: sessionStorage.getItem("transactionID") };
      console.log(data);
      const response = await fetch("/trainer_dee/get_info_for_reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();

      console.log(results);
      this.state.trainerID = results[0].clientID;
      this.setState({
        remainingHour: results[0].remainingHour,
        trainerID: results[0].clientID
      });

      this.getTrainerTimeTable();
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerTimeTable() {
    try {
      // id is trainer's id but the name of parameter in backend is clientID

      let data = { clientID: this.state.trainerID };
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
        trainerTimeTable: results,
        trainerTimeTableByDate: results
      });
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerTimeTableByDate() {
    try {
      // id is trainer's id but the name of parameter in backend is clientID
      let startDate = this.state.targetDate;
      let endDate = this.state.targetEndDate;
      let data = { clientID: this.state.trainerID, startDate, endDate };
      const response = await fetch(
        "/trainer_dee/get_trainer_timetable_byDate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const results = await response.json();
      console.log(results);
      //   this.setState({
      //     trainerTimeTable: results,
      //     trainerTimeTableByDate: results
      //   });
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  onFormChange = e => {
    console.log(e.target.value);
    let nextValue = parseInt(e.target.value) + 1;
    console.log(nextValue);
    this.state.targetDate = this.state.targetDateList[e.target.value]
      .toJSON()
      .slice(0, 10)
      .replace("T", " ");
    this.state.targetEndDate = this.state.targetDateList[nextValue]
      .toJSON()
      .slice(0, 10)
      .replace("T", " ");
    console.log(this.state.targetDate);
    console.log(this.state.targetEndDate);
    this.getTrainerTimeTableByDate();
    // console.log(this.getTrainerTimeTableByDate());
  };

  getTargetDateList = () => {
    let date = new Date();
    let targetDateList = [];
    let targetDateString = [];
    date = date.toLocaleDateString();
    for (let i = 0; i <= 8; i++) {
      let targetDate = new Date().AddDays(i);
      targetDateString.push(targetDate.toLocaleDateString());
      targetDateList.push(targetDate);
    }
    //console.log(targetDateList);
    this.state.targetDateList = targetDateList;
    this.state.targetDateString = targetDateString;
  };

  convertDateFormat = e => {
    // return e.toJSON().slice(0, 19);
    // (dateTime[i].toJSON().slice(0, 19).replace('T', ' ')
  };

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
        <p className="pageHeader">Reserve Session</p>
        <p> {sessionStorage.getItem("transactionID")}</p>
        <p> Remaining Hour: {this.state.remainingHour} Hours</p>
        {/* <p> {this.state.trainerID}</p> */}

        <div style={{ display: "flex", marginTop: "20px" }}>
          <Form.Group>
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              required
              type="date"
              title="targetDate"
              as="select"
              onChange={this.onFormChange}
            >
              <option value="0">{this.state.targetDateString[0]}</option>
              <option value="1">{this.state.targetDateString[1]}</option>
              <option value="2">{this.state.targetDateString[2]}</option>
              <option value="3">{this.state.targetDateString[3]}</option>
              <option value="4">{this.state.targetDateString[4]}</option>
              <option value="5">{this.state.targetDateString[5]}</option>
              <option value="6">{this.state.targetDateString[6]}</option>
              <option value="7">{this.state.targetDateString[7]}</option>
            </Form.Control>
          </Form.Group>
          {/* <DropdownButton
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
          </DropdownButton> */}
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
