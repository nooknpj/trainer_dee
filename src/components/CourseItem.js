import React, { Component } from "react";

export class CourseItem extends Component {
  getService = () => {
    let serviceCode = this.props.service;
    if (serviceCode == 0) return "Yoga";
    if (serviceCode == 1) return "Cardio";
    if (serviceCode == 2) return "WeightTraining";
  };
  render() {
    return (
      <div id="courseItem" style={courseItemStyle}>
        <div id="courseImgContainer">
          <p> {this.props.imageUrl} </p>
        </div>

        <div id="courseItemInfo">
          <h3> {this.props.cName}</h3>

          <p> Service -->{this.getService()} </p>
          <p> Trainer --> {this.props.fName}</p>
          <p> Surname --> {this.props.sName} </p>
          <p> Surname --> {this.props.gender}</p>
          <p> Description --> {this.props.courseDescription}</p>
          <p> Hours --> {this.props.courseHour}</p>
          <p> Cost --> {this.props.cost}</p>
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
