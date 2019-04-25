import React, { Component } from "react";

export class TimeSlot extends Component {
  render() {
    return (
      <div className="timeSlot">
        <p> {this.props.startTime}</p>
        <p> {this.props.status}</p>
      </div>
    );
  }
}

export default TimeSlot;
