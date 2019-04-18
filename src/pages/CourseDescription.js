import React, { Component } from "react";
import LocationPicker from "react-location-picker";
import CourseItem from "../components/CourseItem";
import { Button } from "react-bootstrap";

export class CourseDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseID: 0,
      cName: "courseName",
      service: 0,
      courseHour: 0,
      cost: 0,
      imageUrl: "",
      CourseDescription: "CourseDescription",
      lName: "locationName",
      lat: 13.736717,
      lng: 100.523186,
      rating: 0,
      fName: "firstName",
      lName: "lastName",
      gender: "M",
      telNo: "0000000000"
    };
  }

  componentDidMount() {
    this.getCourseData();
    //console.log(this.state);
  }

  async getCourseData() {
    try {
      let courseID = {};
      if (this.props.location.state == undefined) {
        courseID = { courseID: window.location.pathname.split("/")[2] };
      } else {
        courseID = { courseID: this.props.location.state };
      }
      const response = await fetch("/trainer_dee/get_course_description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(courseID)
      });

      const results = await response.json();
      if (results.length != 0) {
        const result = results[0];

        this.setState({
          courseID: result.courseID,
          cName: result.cName,
          service: result.service,
          courseHour: result.courseHour,
          cost: result.cost,
          imageUrl: result.imageUrl,
          courseDescription: result.courseDescription,
          locName: result.locName,
          lat: result.lat,
          lng: result.lng,
          rating: result.rating,
          fName: result.fName,
          lName: result.lName,
          gender: result.gender,
          telNo: result.telNo
        });
      }
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  onRequestToBuyClick = e => {
    let transactionData = {};
    transactionData["clientID"] = localStorage.getItem("clientID");
    transactionData["courseID"] = this.state.courseID;
    transactionData["status"] = "toBeAccepted";

    this.requestToBuy(transactionData);
  };

  async requestToBuy(e) {
    //TODO: Insert request records in db
    //TODO: Should go to payment screen?
    //TODO: Send E-mail to trainer

    //----------------Get CurrentClientInfo and setUpParameters----------------

    let clientID = localStorage.getItem(clientID);

    const data = { clientID: localStorage.getItem("clientID") };
    const response = await fetch("/trainer_dee/view_profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let results = await response.json();

    let clientToTrainer = {};

    clientToTrainer["fname"] = results[0].FName;
    clientToTrainer["lname"] = results[0].LName;
    clientToTrainer["telno"] = results[0].TelNo;
    clientToTrainer["gender"] = results[0].Gender;
    clientToTrainer["email"] = results[0].Email;

    console.log(clientToTrainer);
    //----------------------------------------------------------------------------

    //----------------Send Email to Trainer --------------------------------------

    //----------------------------------------------------------------------------

    //----------------Create Transaction -----------------------------------------
    // console.log(this.state);

    console.log(e);
    try {
      //   const response = await fetch("/trainer_dee/create_transaction", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify(e.transactionData)
      //   });
      //   const results = await response.json();
    } catch (error) {
      alert("Cannot Create Transaction");
    }
    //----------------------------------------------------------------------------

    alert("Request to buy successful");
    console.log("TEST");
    //window.location = "/";
  }

  render() {
    if (this.state.courseID == 0) {
      return <p>No course!</p>;
    }
    return (
      <div className="addCourseBox">
        <p style={courseDescHeaderStyle}>Course Description</p>
        <div>
          <CourseItem
            courseID={this.state.courseID}
            cName={this.state.cName}
            service={this.state.service}
            courseDescription={this.state.courseDescription}
            cost={this.state.cost}
            fName={this.state.fName}
            lName={this.state.lName}
            courseHour={this.state.courseHour}
            gender={this.state.gender}
            imageUrl={this.state.imageUrl}
            rating={this.state.rating}
          />
          <div className="infoLine">
            <span className="infoTitle">Telephone Number</span>
            <span> {this.state.telNo}</span>
          </div>
          <div className="infoLine">
            <span className="infoTitle">Course Location</span>
            <span> {this.state.locName}</span>
          </div>
          <LocationPicker
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "400px" }} />}
            defaultPosition={{ lat: this.state.lat, lng: this.state.lng }}
            radius={-1}
            zoom={18}
          />
          <div style={{ display: "Block" }}>
            <Button
              variant="primary"
              size="small"
              type="submit"
              onClick={this.onRequestToBuyClick}
            >
              Request to buy this course
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const courseDescHeaderStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "20%",
  minWidth: "250px",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold"
  // marginLeft: "50px"
};

export default CourseDescription;
