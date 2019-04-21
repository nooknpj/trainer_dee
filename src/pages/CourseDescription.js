import React, { Component } from "react";
import LocationPicker from "react-location-picker";
import CourseItem from "../components/CourseItem";
import { Button } from "react-bootstrap";

export class CourseDescription extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseID: 0,
      trainerID: "0000000000",
      cName: "courseName",
      service: 0,
      courseHour: 0,
      cost: 0,
      imageUrl: "",
      CourseDescription: "CourseDescription",
      courseStatus: "0",
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
          trainerID: result.trainerID,
          cName: result.cName,
          service: result.service,
          courseHour: result.courseHour,
          cost: result.cost,
          imageUrl: result.imageUrl,
          courseDescription: result.courseDescription,
          courseStatus: result.courseStatus,
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
    transactionData["trainerID"] = this.state.trainerID;
    transactionData["status"] = "toBeAccepted";

    this.requestToBuy(transactionData);
  };

  async requestToBuy(transactionData) {
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

    transactionData["clientFName"] = results[0].FName;
    transactionData["clientLName"] = results[0].LName;
    transactionData["clientTelno"] = results[0].TelNo;
    transactionData["clientGender"] = results[0].Gender;
    transactionData["clientEmail"] = results[0].Email;

    //----------------------------------------------------------------------------

    //----------------Send Email to Trainer --------------------------------------

    //----------------------------------------------------------------------------

    //----------------Create Transaction -----------------------------------------
    // console.log(this.state);

    console.log(transactionData);
    try {
      const response = await fetch("/trainer_dee/create_transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionData)
      });
      const results = await response.json();

      if (response.status == 450) {
        console.log("transactionExists");
        alert(
          "Cannot send more buy requests. \nPlease check if your request is still waiting for the trainer to accept\nor your request is waiting for your payment \nor you currently have this course."
        );
        return;
      }
    } catch (error) { }
    //----------------------------------------------------------------------------

    //alert("Request to buy successful");

    alert(
      "You successfully sent buy request to the trainer. Please wait 48 hours for trainer to accept your request."
    );
    window.location = "/";

    console.log("TEST");
    //window.location = "/";
  }

  render() {
    if (this.state.courseID == 0) {
      return <p>No course!</p>;
    }
    return (
      <div className="box">
        <p className="pageHeader">Course Description</p>
        <div>
          <CourseItem
            courseID={this.state.courseID}
            trainerID={this.state.trainerID}
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
            courseStatus={this.state.courseStatus}
          />
          <div className="descriptionLine">
            <span className="descriptionTitle">Telephone Number</span>
            <div className="courseDescriptionBox">
              <span> {this.state.telNo}</span>
            </div>

          </div>
          <div className="descriptionLine">
            <span className="descriptionTitle">Course Location</span>
            <div className="courseDescriptionBox">
              <span> {this.state.locName}</span>
              <LocationPicker
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "400px" }} />}
                defaultPosition={{ lat: this.state.lat, lng: this.state.lng }}
                radius={-1}
                zoom={18}
              />
            </div>

          </div>

          <div style={{ display: "Block" }}>
            {this.state.trainerID == localStorage.getItem("clientID") ? (
              <Button
                variant="primary"
                size="small"
                type="submit"
                href="/editCourse"
              >
                Edit course
              </Button>
            ) : (
                <Button
                  variant="primary"
                  size="small"
                  type="submit"
                  onClick={this.onRequestToBuyClick}
                >
                  Request to buy this course
              </Button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDescription;
