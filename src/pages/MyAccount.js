import React, { Component } from "react";
import "../css/myAccount.css";
import "../css/courseBox.css";
import { Button } from 'react-bootstrap';

export class MyAccount extends Component {

  constructor() {
    super();
    this.state = {
      FName: "HI",
      Address: "SS"
    };
  }

  componentDidMount() {
    this.getProfile();
    //this.getMockUpResult();
  }

  async getProfile() {
    try {
      const data = { clientid: localStorage.getItem("clientID") }
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
        isTrainer: results[0].isTrainer
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
    if (this.state.Gender == "M") {
      genderStyle["backgroundColor"] = "#0084D5";
    } else if (this.state.Gender == "F") {
      genderStyle["backgroundColor"] = "#EF6079";
    }

    return genderStyle;
  };

  render() {
    return (
      <div className="profileBox">
        {/* <span>My Client id is </span>
        <span> {localStorage.getItem("clientID")} </span> */}

        <div id="courseItemInfo">
          <div className="infoLine">
            <div className="trainerInfoTitleContainer">
              <a className="infoTitle">Name</a>
            </div>
            <div className="trainerInfoContainer">
              <div className="trainerName">
                <a> {this.state.FName}</a>
                <a> {this.state.LName} </a>
              </div>
              <div style={this.getGenderStyle()}>
                <a> {this.state.Gender}</a>
              </div>
            </div>
          </div>

          <div className="descriptionLine">
            <a className="descriptionTitle">Address</a>
            <div className="courseDescriptionBox">
              <a> {this.state.Address} </a>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoTitleContainer">
              <a className="infoTitle">Telephone Number</a>
            </div>
            <div className="infoText">
              <a> {this.state.TelNo}</a>
            </div>
          </div>
          <div className="">
            <Button href="/myAccount/edit">Edit</Button>
            <Button href="/myAccount/upgrade">Upgrade</Button>
          </div>

        </div>
      </div>
    );
  }
}

export default MyAccount;
