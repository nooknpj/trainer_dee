import React, { Component } from "react";

export class CourseItem extends Component {
  render() {
    return (
      <div id="courseItem" style={courseItemStyle}>
        <div id="courseImgContainer">
          <p> {this.props.imgUrl} </p>
        </div>

        <div id="courseItemInfo">
          <h3> {this.props.title}</h3>
          <p> Trainer --> {this.props.trainer}</p>
          <p> Hours --> {this.props.hours}</p>
          <p> Price --> {this.props.price}</p>
        </div>
      </div>
    );
  }
}

const courseItemStyle = {
  backgroundColor: "black"
};
export default CourseItem;
