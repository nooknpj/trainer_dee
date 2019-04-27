import React, { Component } from "react";

export class TimeSlot extends Component {
  constructor() {
    super();
    this.state = {
      timeString: "00.00 - 00.00",
      selected: 0
    };
  }
  componentDidMount() {
    let endTime = parseInt(this.props.startTime) + 1;
    var timeString = `${this.props.startTime}.00 - ${endTime}.00`;
    this.setState({
      timeString: timeString,
      selected: 0
    });
  }

  getClassName = () => {
    let className = "timeSlot";
    if (this.props.status == "available") {
      className = "availableTimeSlot";
    }

    return className;
  };

  getTimeHeaderStyle = () => {
    let getTimeHeaderStyle = {
      backgroundColor: "black"
    };
    return getTimeHeaderStyle;
  };
  getSelectedTimeSlotStyle = () => {
    let timeSlotStyle = {
      //   backgroundColor: "red"
    };
    // render according to timeSlot.status
    if (this.state.selected && this.props.status == "available") {
      timeSlotStyle["backgroundColor"] = "#275d38";
    } else if (!this.state.selected && this.props.status == "available") {
      timeSlotStyle["backgroundColor"] = "#5bc500";
    } else if (!this.state.selected && this.props.status != "available") {
      timeSlotStyle["backgroundColor"] = "#75787b";
    }

    return timeSlotStyle;
  };

  //   toggleHover = () => {
  //     this.setState({ hover: !this.state.hover });
  //   };
  onTimeSlotClick = () => {
    if (!this.props.isContinuous(this.props.startTime)) {
      alert(notContinuousAlertText);
      return;
    }

    // console.log(this.state.selected);
    if (!this.state.selected) {
      if (!this.props.haveEnoughRemainingHour()) {
        alert(notEnoughRemainingHourAlertText);
        return;
      }
      this.props.addToSelectedList(this.props.startTime);

      this.setState(
        {
          selected: 1
        },
        () => console.log("was not selected -> now =", this.state.selected)
      );
      //   console.log("was not selected -> now =", this.state.selected);
      //   return;
    } else if (this.state.selected) {
      this.props.removeFromSelectedList(this.props.startTime);
      //   this.state.selected = 0;
      this.setState(
        {
          selected: 0
        },
        () => console.log("was not selected -> now =", this.state.selected)
      );
      //   console.log("was selected -> now =", this.state.selected);
      //   return;
    }
  };
  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.getSelectedTimeSlotStyle()}
        onClick={
          this.props.status == "available" ? this.onTimeSlotClick : undefined
        }
      >
        <p style={this.getTimeHeaderStyle()}> {this.state.timeString}</p>
        <p> {this.props.status}</p>
      </div>
    );
  }
}

const notEnoughRemainingHourAlertText =
  "Your timeslots duration exceeds remaining hour.\nYou can not select more timeslots.";

const notContinuousAlertText =
  "Your timeslots have to be continuous.\nPlease select a consecutive time range.";
export default TimeSlot;
