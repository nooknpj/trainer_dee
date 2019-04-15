import React, { Component } from "react";
import ClientAccount from "./ClientAccount";
import TrainerAccount from "./TrainerAccount";
import CourseItem from "../components/CourseItem";

export class MyAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
      attendedCourse: []
    }
  }

  componentDidMount() {
    this.getAttendedCourse();
  }

  async getAttendedCourse() {
    //TODO: Query client's bought/request courses from db and insert into this.state.attendedCourse
  }

  render() {
    return (
      <div>
        <div className="profileBox">
          <p style={profileHeaderStyle}>My Account</p>
          {localStorage.getItem("isTrainer") == 0 ? (
            <div>
              <ClientAccount />
            </div>
          ) : (
              <div>
                <TrainerAccount />
              </div>
            )}
          <div id="courseTitleContainer">
            <a href='' className="courseTitle">
              {" "}
              {"Attended Course"}{" "}
            </a>
          </div>
          {this.state.attendedCourse.length != 0 ? (
            this.state.attendedCourse.map(courseItem => (
              <CourseItem
                courseID={courseItem.courseID}
                cName={courseItem.cName}
                service={courseItem.service}
                courseDescription={courseItem.courseDescription}
                cost={courseItem.cost}
                fName={courseItem.fName}
                lName={courseItem.lName}
                courseHour={courseItem.courseHour}
                gender={courseItem.gender}
                imageUrl={courseItem.imageUrl}
                rating={courseItem.rating}
              />
            ))
          ) : (
              <h5>No attended course.</h5>
            )}
        </div>
      </div>
    );
  }
}

const profileHeaderStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "20%",
  minWidth: "250px",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold"
};

export default MyAccount;
