import React, { Component } from "react";

export class CourseItem extends Component {
  render() {
    return (
      <div id="courseItem" style={courseItemStyle}>
        <div id="courseImgContainer">
          <p> {this.props.ImageUrl} </p>
        </div>

        <div id="courseItemInfo">
          <h3> {this.props.CName}</h3>
          <p> Trainer --> {this.props.TrainerID}</p>
          <p> Hours --> {this.props.CourseHour}</p>
          <p> Cost --> {this.props.Cost}</p>
        </div>
      </div>
    );
  }
}

const courseItemStyle = {
  backgroundColor: "black"
};
export default CourseItem;
