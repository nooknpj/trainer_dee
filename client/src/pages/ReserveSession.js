import React, { Component } from "react";
import { Dropdown, DropdownButton, Button, Form } from "react-bootstrap";
import TimeTableRow from "../components/TimeTableRow";

Date.prototype.AddDays = function(days) {
  days = parseInt(days, 10);
  return new Date(this.valueOf() + 1000 * 60 * 60 * 24 * days);
};
class ReserveSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainerTimeTableByDate: [],
      remainingHour: 0,
      targetDate: "",
      targetEndDate: "",
      trainerID: "defaultTrainerID",
      targetDateList: [],
      targetDateString: [],
      timeTableResult: [],
      emptyTimeTableResult: this.getDefaultTimeTableResult(),
      selectedTimeSlots: []
    };
  }

  componentDidMount() {
    let defaultTargetDate = new Date();
    this.setState({
      targetDate: this.convertDateFormat(defaultTargetDate)
    });

    this.getTargetDateList();
    this.getInfoForReservation();
    // this.getTargetDateList();
    // this.getTrainerTimeTableByDate();
    // this.getTrainerTimeTableByDate();
    // this.updateTimeTableResult();
    console.log(this.state);
    // console.log(this.state.trainerTimeTableByDate);
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
      this.getTrainerTimeTableByDate();
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerTimeTableByDate() {
    try {
      // id is trainer's id but the name of parameter in backend is clientID

      let startDate = this.state.targetDate;
      // let endDate = this.state.targetEndDate;
      console.log("1:  ", this.state.trainerID);
      console.log("2:  ", startDate);
      let data = { clientID: this.state.trainerID, startDate };
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
      // console.log(results);
      // console.log(results);
      // this.setState({
      //   trainerTimeTableByDate: results
      // });
      this.state.trainerTimeTableByDate = results;
      this.setState({
        trainerTimeTableByDate: results
      });
      console.log(this.state.trainerTimeTableByDate);

      this.updateTimeTableResult();
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  // updateTimeTableResult = e => {
  //   let timeTableResult = this.state.timeTableResult;
  //   let trainerTimeTableByDate = this.state.trainerTimeTableByDate;
  //   console.log(trainerTimeTableByDate);
  //   console.log(timeTableResult);

  //   for (let i = 0; i < trainerTimeTableByDate.length; i++) {
  //     // console.log(trainerTimeTableByDate[i]);
  //     let timeSlot = this.state.trainerTimeTableByDate[i];
  //     let targetTimeSlot = this.getTargetTimeSlot(timeSlot.startTime);
  //     // console.log(targetTimeSlot);

  //     targetTimeSlot.status = timeSlot.tableStatus;
  //   }

  //   console.log(timeTableResult);

  //   this.setState({
  //     timeTableResult: timeTableResult
  //   });
  //   console.log(this.state.timeTableResult);
  // };

  updateTimeTableResult = e => {
    let timeTableResult = this.getDefaultTimeTableResult();
    this.setState({
      timeTableResult: this.getDefaultTimeTableResult()
    });

    let trainerTimeTableByDate = this.state.trainerTimeTableByDate;
    // console.log("state.tableByDate", trainerTimeTableByDate);
    // console.log("empty:->", this.state.timeTableResult);

    for (let i = 0; i < trainerTimeTableByDate.length; i++) {
      // console.log(trainerTimeTableByDate[i]);
      let timeSlot = this.state.trainerTimeTableByDate[i];
      console.log(timeSlot);
      let targetTimeSlot = this.getTargetTimeSlot(timeSlot.startTime);
      // console.log("targetTimeSlot", targetTimeSlot);
      targetTimeSlot.status = timeSlot.tableStatus;
      // console.log("targetTimeSlot", targetTimeSlot);
    }

    this.setState({});

    // console.log(this.state.timeTableResult);
  };

  onFormChange = e => {
    console.log(e.target.value);
    let nextValue = parseInt(e.target.value) + 1;
    console.log(nextValue);
    // this.state.targetDate = this.state.targetDateList[e.target.value];
    this.state.targetDate = this.convertDateFormat(
      this.state.targetDateList[e.target.value]
    );
    this.state.targetEndDate = this.convertDateFormat(
      this.state.targetDateList[nextValue]
    );

    this.getTrainerTimeTableByDate();
  };

  getTargetTimeSlot = startTime => {
    console.log(this.state.timeTableResult);
    let targetTimeSlot = this.state.timeTableResult.find(
      obj => obj.startTime == startTime
    );

    if (typeof targetTimeSlot == "undefined") {
      targetTimeSlot = {
        startDate: "default",
        startTime: "default",
        status: "default"
      };
    }
    return targetTimeSlot;
  };
  // --------------------------------initialize constant---------------------------------------------------------------------
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

  getDefaultTimeTableResult = e => {
    let timeTableResult = [];

    for (let startTime = 5; startTime <= 22; startTime++) {
      let timeSlot = {};
      timeSlot.startTime = startTime;
      timeSlot.status = "notAvailable";
      timeTableResult.push(timeSlot);
    }
    return timeTableResult;
    // this.state.timeTableResult = timeTableResult;
    // console.log(this.state.timeTableResult);
  };

  convertDateFormat = e => {
    let list = e.toLocaleDateString("en-US", { hour12: false });
    list = list.split("/");
    // console.log(list);
    let result = `${list[2]}-${list[0]}-${list[1]}`;
    return result;
  };

  // getPossibleRange = e => {
  //   let trainerTimeTableByDate = this.state.trainerTimeTableByDate;
  //   console.log(this.state.trainerTimeTableByDate);
  //   for (let i = 0; i < trainerTimeTableByDate.length; i++) {
  //     console.log("possible range", trainerTimeTableByDate[i]);
  //   }
  // };

  getHour = e => {
    console.log(e);
  };

  //-------------------------------------reserve and timeslot
  addToSelectedList = e => {
    this.state.selectedTimeSlots.push(e);
    console.log(this.state.selectedTimeSlots);
  };

  removeFromSelectedList = e => {
    let newList = this.state.selectedTimeSlots;
    console.log(e);
    // // let targetIndex = newList.findIndex(function());
    // console.log(targetIndex);
    // delete newList[targetIndex];
    newList = this.state.selectedTimeSlots.filter(function(ts) {
      return ts != e;
    });
    this.state.selectedTimeSlots = newList;
    console.log(this.state.selectedTimeSlots);
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px"
          }}
        >
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
          <div className="timeTableRow">
            {/* {console.log("before passing props", this.state.timeTableResult)} */}
            <TimeTableRow
              timeTableResult={this.state.timeTableResult}
              addToSelectedList={this.addToSelectedList}
              removeFromSelectedList={this.removeFromSelectedList}
            />
          </div>

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
