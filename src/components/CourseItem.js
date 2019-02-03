import React, { Component } from "react";

export class CourseItem extends Component {
  render() {
    return (
      <div id="courseItem" style={courseItemStyle}>
        <div id="courseImgContainer">CourseImgHere</div>

        <div id="courseItemInfo">
          <h3> {this.props.title}</h3>
          <p> Trainer --> {this.props.trainer}</p>
        </div>
      </div>
    );
  }
}

const courseItemStyle = {
  backgroundColor: "black"
};
export default CourseItem;
