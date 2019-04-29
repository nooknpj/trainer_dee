import React, { Component } from "react";
import "../css/sessionItem.css";

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

  getService = service => {
    if (service == 0) return "Yoga";
    if (service == 1) return "Cardio";
    if (service == 2) return "WeightTraining";
    else return "others";
  };
  render() {
    return (
      <div
        className="sessionItem"
        style={{ display: "flex", flexDirection: "row", marginBottom: "2em" }}
        // className={this.getClassName()}
        // style={this.getSelectedTimeSlotStyle()}
        // onClick={
        //   this.props.status == "available" ? this.onTimeSlotClick : undefined
        // }
      >
        <div>
          <div style={lineStyle}>
            <div className="fieldItem">
              <span className="fieldTitle">TransactionID</span>
              <span className="fieldInfo">{this.props.transactionID}</span>
            </div>
          </div>

          <div style={lineStyle}>
            <div className="fieldItem">
              <span className="fieldTitle">Course Name</span>{" "}
              <span className="fieldInfo">{this.props.cName} </span>
            </div>
            <div className="fieldItem">
              <span className="fieldTitle"> Course Service </span>
              <span className="fieldInfo">
                {this.getService(this.props.service)}{" "}
              </span>
            </div>
            <div className="fieldItem">
              <span className="fieldTitle">{this.props.collegueRole}</span>{" "}
              <span className="fieldInfo">
                {this.props.fName} {this.props.lName}
              </span>
            </div>

            <div className="fieldItem">
              <span className="fieldTitle">TelNo</span>{" "}
              <span className="fieldInfo">{this.props.telNo} </span>
            </div>
          </div>
          <div style={lineStyle}>
            <div className="fieldItem">
              <span className="fieldTitle">SessionNo</span>
              <span className="fieldInfo">{this.props.sessionNo}</span>
            </div>
            <div className="fieldItem">
              <span className="fieldTitle"> Session Date </span>
              <span className="fieldInfo"> {this.getDate()} </span>
            </div>
            <div className="fieldItem">
              <span className="fieldTitle"> Session Time</span>
              <span className="fieldInfo">{this.getTime()} </span>
            </div>

            {/* <div className="fieldItem">
              <span className="fieldTitle">Duration </span>
              <span className="fieldInfo">{this.props.duration} Hours</span>
            </div> */}

            <div className="fieldItem">
              <span className="fieldTitle"> Session Status</span>
              <span className="fieldInfo">{this.props.sessionStatus} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const lineStyle = {
  marginTop: "0.3em",

  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap"
};

const infoItemStyle = {
  marginTop: "0.3em",
  marginRight: "0.3em",
  border: "solid #21366e 0.ๅem",
  borderRadius: "0.2em"
};
const notEnoughRemainingHourAlertText =
  "Your timeslots duration exceeds remaining hour.\nYou can not select more timeslots.";

const notContinuousAlertText =
  "Your timeslots have to be continuos.\nPlease select a consecutive time range.";
export default SessionItem;
