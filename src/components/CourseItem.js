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
      <div id="courseItem">
        <div id="courseImgContainer">
          <p> {this.props.imageUrl} </p>
        </div>

        <div id="courseItemInfo">
          <div id="courseHeaderContainer">
            <div id="courseTitleContainer">
              <a className="courseTitle"> {this.props.cName} </a>
            </div>
            <div id="courseServiceContainer">
              <p className="courseService"> {this.getService()} </p>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoTitleContainer">
              <a className="infoTitle"> Trainer</a>
            </div>

            <div className="trainerNameContainer">
              <a> {this.props.fName}</a>
              <a> {this.props.sName} </a>
              <a> {this.props.gender}</a>
            </div>
          </div>

          <div className="descriptionLine">
            <a className="descriptionTitle"> Course Description</a>
            <div className="courseDescriptionBox">
              <a> {this.props.courseDescription} </a>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoTitleContainer">
              <a className="infoTitle"> Course Duration</a>
            </div>
            <div className="infoText">
              <a> {this.props.courseHour}</a>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoTitleContainer">
              <a className="infoTitle"> Course Cost</a>
            </div>

            <div className="infoText">
              <a> {this.props.cost}</a>
            </div>
          </div>
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

export default CourseItem;
