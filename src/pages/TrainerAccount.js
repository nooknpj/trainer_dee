import React, { Component } from "react";
import "../css/myAccount.css";
import starIcon from "../img/star.png";
import { Button } from "react-bootstrap";

export class TrainerAccount extends Component {
  constructor() {
    super();
    this.state = {
      Address: "MyAddress",
      ClientID: "000000000000",
      FName: "MyFirstName",
      LName: "MyLastName",
      Gender: "MyGender",
      TelNo: "0000000000",
      Email: "myemail@trainer-d.com",
      isTrainer: -1,
      Ssn: "defaultSSN",
      TrainerDescription: "defaultTrainerDescription",
      Rating: "trainerDefaultRating",
      TrainerImg: "defaultUrl"
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getTrainerProfile();
    //this.getMockUpResult();
  }

  async getProfile() {
    try {
      const data = { clientID: localStorage.getItem("clientID") };
      const response = await fetch("/trainer_dee/view_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      this.setState({
        Address: results[0].Address,
        ClientID: results[0].ClientID,
        FName: results[0].FName,
        LName: results[0].LName,
        Gender: results[0].Gender,
        TelNo: results[0].TelNo,
        isTrainer: results[0].isTrainer,
        Email: results[0].Email
      });
      console.log(this.state);
      if (this.state.isTrainer == 1) {
        // const response = await fetch("/trainer_dee/view_profile", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   body: JSON.stringify(data)
        // });
        // const results = await response.json();
      }
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerProfile() {
    try {
      const data = { trainerID: localStorage.getItem("clientID") };
      const response = await fetch("/trainer_dee/view_trainer_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      this.setState({
        Ssn: results[0].Ssn,
        TrainerDescription: results[0].TrainerDescription,
        Rating: results[0].Rating,
        TrainerImg: results[0].TrainerImg
      });
      console.log(this.state);
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
      maxHeight: "30px",
      maxWidth: "30px"
    };
    if (this.state.Gender == "M") {
      genderStyle["backgroundColor"] = "#0084D5";
    } else if (this.state.Gender == "F") {
      genderStyle["backgroundColor"] = "#EF6079";
    }

    return genderStyle;
  };

  getAccountType = () => {
    let isTrainer = this.state.isTrainer;
    if (isTrainer == 0) {
      return "Client Account";
    } else if (isTrainer == 1) {
      return "Trainer Account";
    } else return "Something went wrong.";
  };

  render() {
    return (
      <div>
        <div className="accountInfoContainer">
          <a className="accountInfoTitle">
            {" "}
            {this.getAccountType()}
          </a>
        </div>

        <img className="trainerImage" src={this.state.TrainerImg} style={{ marginBottom: "30px" }} />

        <div className="inLineContainer">

          <div className="accountInfoContainer">
            <a className="accountInfoTitle">Email Address</a>
            <div className="accountInfoBox">
              <a> {this.state.Email}</a>
            </div>
          </div>

          <div className="accountInfoContainer">
            <a className="accountInfoTitle">Name Gender Rating</a>
            <div className="accountInfoBox">
              <a style={{ marginRight: "15px" }}> {this.state.FName}</a>
              <a style={{ marginRight: "15px" }}> {this.state.LName} </a>
              <div style={this.getGenderStyle()}>
                <a> {this.state.Gender}</a>
              </div>
              <a style={ratingStyle}>Rating</a>
              <a style={{ marginLeft: "15px" }}> {this.state.Rating}</a>
              <img className="starIconStyle" src={starIcon} />
            </div>
          </div>

        </div>
        <div className="inLineContainer">

          <div className="accountInfoContainer">
            <a className="accountInfoTitle">SSN (or Citizen ID)</a>
            <div className="accountInfoBox">
              <a> {this.state.Ssn}</a>
            </div>
          </div>

          <div className="accountInfoContainer">
            <a className="accountInfoTitle">Telephone Number</a>
            <div className="accountInfoBox">
              <a> {this.state.TelNo}</a>
            </div>
          </div>

        </div>

        <div className="accountDescriptionContainer">
          <a className="accountDescriptionTitle">Trainer Description</a>
          <div className="accountDescriptionBox">
            <a> {this.state.TrainerDescription} </a>
          </div>
        </div>
        <div className="accountDescriptionContainer">
          <a className="accountDescriptionTitle">Address</a>
          <div className="accountDescriptionBox">
            <a> {this.state.Address} </a>
          </div>
        </div>

        {this.state.isTrainer == 0 ? (
          <div className="buttonContainer">
            <Button href="/editProfile">Edit</Button>
            <Button style={{ marginLeft: "20px" }} href="/upgrade">
              Upgrade
              </Button>
          </div>
        ) : (
            <div className="buttonContainer">
              <Button href="/editProfile">Edit</Button>
            </div>
          )}

      </div >
    );
  }
}

const ratingStyle = {
  marginLeft: "10px",
  paddingLeft: "3px",
  paddingRight: "3px",
  color: "white",
  borderRadius: "5px",
  backgroundColor: "#006cb0"
};

export default TrainerAccount;
