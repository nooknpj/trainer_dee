import React, { Component } from "react";

export class SessionItem extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

  getDate = () => {
    let dateTime = this.props.startTime;
    let date = dateTime.split(" ")[0];
    date = date.split("-");
    let dateString = `${date[2]}/${date[1]}/${date[0]}`;
    console.log(date);
    return dateString;
  };

  getTime = () => {
    let dateTime = this.props.startTime;
    let time = dateTime.split(" ")[1];
    time = time.split(":");
    let startTime = parseInt(time);
    let endTime = startTime + this.props.duration;
    let timeString = `${time[0]}:00 - ${endTime}:00`;
    console.log(time);
    return timeString;
  };

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "2em" }}
        // className={this.getClassName()}
        // style={this.getSelectedTimeSlotStyle()}
        // onClick={
        //   this.props.status == "available" ? this.onTimeSlotClick : undefined
        // }
      >
        <div>
          <span> TransactionID : {this.props.transactionID}</span>
          <span> SessionNo : {this.props.sessionNo}</span>
          <span> Course Name : {this.props.cName} </span>
          <span> Course Service : {this.props.service} </span>

          <br />

          <span> Session Date : {this.getDate()} </span>
          <span> Session Time : {this.getTime()} </span>
          <span> Duration : {this.props.duration} Hours</span>
          <span> Session Status : {this.props.sessionStatus} </span>
          <br />
          <span>
            {this.props.collegueRole} : {this.props.fName} {this.props.lName}{" "}
          </span>
          <span>TelNo : {this.props.telNo} </span>
        </div>
      </div>
    );
  }
}

const notEnoughRemainingHourAlertText =
  "Your timeslots duration exceeds remaining hour.\nYou can not select more timeslots.";

const notContinuousAlertText =
  "Your timeslots have to be continuos.\nPlease select a consecutive time range.";
export default SessionItem;
