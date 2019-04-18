import React, { Component } from "react";
import starIcon from "../img/star.png";
import "../css/courseItem.css";
import { Link } from "react-router-dom"

export class CourseItem extends Component {

  constructor(props){
    super(props);

    this.state = {
      coursesClient: []
    }
  }

  getService = () => {
    let serviceCode = this.props.service;
    if (serviceCode == 0) return "Yoga";
    if (serviceCode == 1) return "Cardio";
    if (serviceCode == 2) return "WeightTraining";
  };

  componentDidMount(){
    this.getCoursesClient();
  }

  async getCoursesClient() {
    try {
        const data = { courseID: this.props.courseID };
        const response = await fetch("/trainer_dee/get_courses_client", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const results = await response.json();
        this.setState({
          coursesClient: results
        })
        console.log(this.state.coursesClient);
    } catch (error) {
        console.log("defaultFetchError : ", error);
    }
}

  getGenderStyle = () => {
    let genderStyle = {
      backgroundColor: "green",
      color: "white",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "5px",
      marginRight: "5px",
      marginLeft: "5px",
      align: "center",
      maxHeight: "30px"
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
              {/* <a href={'/courseDesc:'+ this.props.cName} className="courseTitle">
                {" "}
                {this.props.cName}{" "}
              </a> */}
              <Link to={{ pathname: `/courseDesc/${this.props.courseID}`, state: this.props.courseID }} className="courseTitle">
                {" "}
                {this.props.cName}{" "}
              </Link>
            </div>
            <div id="courseServiceContainer">
              <p className="courseService"> {this.getService()} </p>
            </div>
          </div>

          <div className="infoLine">
            {window.location.pathname != "/myCourse" ? (
              <div className="trainerInfoContainer">
                <div>
                  <span className="infoTitle"> Trainer</span>
                  <a> {this.props.fName}</a>
                  <a> {this.props.lName} </a>
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
            ) : (
                <div />
              )}

          </div>

          <div className="descriptionLine">
            <a className="descriptionTitle"> Course Description</a>
            <div className="courseDescriptionBox">
              <a> {this.props.courseDescription} </a>
            </div>
          </div>

          <div className="infoLine">
            <span className="infoTitle"> Course Duration</span>
            <span> {this.props.courseHour}</span>
            <span> Hours</span>
          </div>

          <div className="infoLine">
            <p className="infoTitle"> Course Cost</p>
            <p> {this.props.cost}</p>
            <p> Baht</p>
          </div>
          {window.location.pathname != "/myCourse" && this.props.isAttendedPage != 1 ?(
            <div/>
          ):(
            this.state.coursesClient.map(courseClient =>(
              <p>{courseClient.fName} {courseClient.lName} {courseClient.telNo}</p>
            ))
          )}
        </div>
      </div>
    );
  }
}

const starIconStyle = {
  maxWidth: "1em",
  maxHeight: "1em",
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
