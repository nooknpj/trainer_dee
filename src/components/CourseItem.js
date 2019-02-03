import React, { Component } from "react";

export class CourseItem extends Component {
  render() {
    return (
      <div style={courseItemStyle}>
        <h5> Course Name --> {this.props.title}</h5>

        <p> Trainer --> {this.props.trainer}</p>
      </div>
    );
  }
}

const courseItemStyle = {
  backgroundColor: "black",
  border: "solid white 5px",
  borderRadius: "10px",
  color: "white",
  padding: "10px",
  marginTop: "10px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "5px"
};
export default CourseItem;
