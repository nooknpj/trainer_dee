import React, { Component } from "react";
import "../css/myAccount.css";
import "../css/courseBox.css";
import { Button } from "react-bootstrap";

export class ClientAccount extends Component {
  constructor() {
    super();
    this.state = {
      Address: "MyAddress",
      ClientID: "000000000000",
      FName: "MyFirstName",
      LName: "MyLastName",
      Gender: "MyGender",
      TelNo: "0000000000",
      mail: "myemail@trainer-d.com",
      isTrainer: -1
    };
  }

  componentDidMount() {
    this.getProfile();
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
        <div className="infoLine">
          <div className="accountTitleContainer">
            <a className="infoTitle" style={accountTypeStyle}>
              {" "}
              {this.getAccountType()}
            </a>
          </div>
        </div>

        <div id="accountInfo">
          <div className="infoLine" style={{ marginTop: "30px" }}>
            <div className="accountTitleContainer">
              <a className="accountTitle">Email Address</a>
            </div>
            <div className="accountNameContainer">
              <a> {this.state.Email}</a>
            </div>
          </div>

          <div className="infoLine">
            <div className="accountTitleContainer">
              <a className="accountTitle">Name and Gender</a>
            </div>
            <div className="accountNameContainer">
              <div>
                <a style={{ marginRight: "15px" }}> {this.state.FName}</a>
                <a style={{ marginRight: "15px" }}> {this.state.LName} </a>
              </div>
              <div style={this.getGenderStyle()}>
                <a> {this.state.Gender}</a>
              </div>
            </div>
          </div>

          <div className="infoLine">
            <div className="accountTitleContainer">
              <a className="infoTitle">Telephone Number</a>
            </div>
            <div className="accountNameContainer">
              <a> {this.state.TelNo}</a>
            </div>
          </div>

          <div className="descriptionLine">
            <a className="descriptionTitle">Address</a>
            <div className="courseDescriptionBox">
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
        </div>
      </div>
    );
  }
}

const accountTypeStyle = {
  fontSize: "20px"
};

export default ClientAccount;
