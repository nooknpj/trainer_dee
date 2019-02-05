import React, { Component } from "react";

export class CourseItem extends Component {
  getService = () => {
    let serviceCode = this.props.Service;
    if (serviceCode == 0) return "Yoga";
    if (serviceCode == 1) return "Cardio";
    if (serviceCode == 2) return "WeightTraining";
  };
  render() {
    return (
      <div id="courseItem" style={courseItemStyle}>
        <div id="courseImgContainer">
          <p> {this.props.ImageUrl} </p>
        </div>

        <div id="courseItemInfo">
          <h3> {this.props.CName}</h3>
          <p> Trainer --> {this.props.TrainerID}</p>
          <p> Service --> {this.getService()} </p>
          <p> Hours --> {this.props.CourseHour}</p>
          <p> Cost --> {this.props.Cost}</p>
          <p> service --> {this.props.service}</p>
        </div>
      </div>
    );
  }
}

//CourseItemProps;
// CourseID={courseItem.CourseID}
// CName={courseItem.CName}
// Service={courseItem.Service}
// CourseDescription={courseItem.CourseDescription}
// Cost={courseItem.Cost}
// TrainerID={courseItem.TrainerID}
// CourseHour={courseItem.CourseHour}
// ImageUrl={courseItem.Image}
const courseItemStyle = {
  backgroundColor: "black"
};
export default CourseItem;
