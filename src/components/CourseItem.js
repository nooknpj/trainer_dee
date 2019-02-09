import React, { Component } from "react";
import starIcon from "../img/star.png";
import "../css/courseItem.css";

export class CourseItem extends Component {
  getService = () => {
    let serviceCode = this.props.service;
    if (serviceCode == 0) return "Yoga";
    if (serviceCode == 1) return "Cardio";
    if (serviceCode == 2) return "WeightTraining";
  };

  getGenderStyle = () => {
    let genderStyle = {
      backgroundColor: "green",
      color: "white",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "5px",
      marginRight: "5px",
      marginLeft: "5px",
      align: "center"
    };
    if (this.props.gender == "M") {
      genderStyle["backgroundColor"] = "#0084D5";
    } else if (this.props.gender == "F") {
      genderStyle["backgroundColor"] = "#EF6079";
    }

    return genderStyle;
  };

  render() {
    return (
      <div id="courseItem">
        <div id="courseImgContainer">
          <img className="courseImg" src={this.props.imageUrl} width="100%" />

          {/* <p> {this.props.imageUrl} </p> */}
        </div>

        <div id="courseItemInfo">
          <div id="courseHeaderContainer">
            <div id="courseTitleContainer">
              <a href="/searchCourses" className="courseTitle">
                {" "}
                {this.props.cName}{" "}
              </a>
            </div>
            <div id="courseServiceContainer">
              <p className="courseService"> {this.getService()} </p>
            </div>
          </div>

          <div className="infoLine">
            <div className="trainerInfoTitleContainer">
              <a className="infoTitle"> Trainer</a>
            </div>

            <div className="trainerInfoContainer">
              <div className="trainerName">
                <a> {this.props.fName}</a>
                <a> {this.props.sName} </a>
              </div>
              <div style={this.getGenderStyle()}>
                <a> {this.props.gender}</a>
              </div>

              <div className="ratingContainer">
                <a style={{ marginRight: "5px" }}>
                  {" "}
                  {this.props.rating.toFixed(1)}
                </a>
                <img style={starIconStyle} src={starIcon} />
              </div>
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
              <a> Hours</a>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoTitleContainer">
              <a className="infoTitle"> Course Cost</a>
            </div>

            <div className="infoText">
              <a> {this.props.cost}</a>
              <a> Baht</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const starIconStyle = {
  maxWidth: "20px",
  maxHeight: "20px",
  align: "center",
  paddingTop: "1px",
  paddingBottom: "3px"
};
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
