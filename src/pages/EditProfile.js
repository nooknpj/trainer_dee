import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/editProfile.css";
import { Redirect } from "react-router";

export class EditProfile extends Component {
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
      isTrainer: -1,
      Ssn: "",
      TrainerDescription: "",
      Rating: "",
      TrainerImg: ""
    };
  }

  componentDidMount() {
    this.getProfile();
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
        this.getTrainerProfile();
      }
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }

    console.log(this.state);
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

  onFormChange = e => {
    this.state[e.target.title] = e.target.value;
    console.log(this.state);
  };

  onSaveProfile = e => {
    this.fetchSaveProfile();
    if (localStorage.getItem("isTrainer") == 1) {
      this.fetchSaveTrainerProfile();
    }
    e.preventDefault();
    window.location = "/myAccount";
  };

  async fetchSaveProfile(e) {
    const data = this.state;
    try {
      data.clientID = localStorage.getItem("clientID");
      switch (data.gender) {
        case "Male":
          data.gender = "M";
          break;

        case "Male":
          data.gender = "F";
          break;

        case "Other":
          data.gender = "O";
          break;

        default:
          data.gender = "M";
      }

      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/edit_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log("Edit profile failed", error);
    }
    localStorage.setItem("fName", data.firstName);
    // this.setState({ redirectToNewPage: true })
    // this.props.history.push('/myAccount');
  }
  async fetchSaveTrainerProfile(e) {
    const data = this.state;
    try {
      data.clientID = localStorage.getItem("clientID");

      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/edit_trainer_profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log("Edit profile failed", error);
    }

    // this.setState({ redirectToNewPage: true })
    // this.props.history.push('/myAccount');
  }

  render() {
    // if (this.state.redirectToNewPage) {
    //   return (
    //   <Redirect to="/myAccount"/>
    //   )
    // }
    return (
      <div className="box">
        <p className="pageHeader">Edit Profile</p>

        {/* <span>My Client ID is </span>
        <span> {localStorage.getItem("clientID")} </span> */}

        <div id="profileInfo">
          <Form onSubmit={this.onSaveProfile}>
            <div className="nameTitleContainer">
              <a className="infoTitle" style={{ color: "white" }}>
                Name and Gender
              </a>
            </div>
            <div className="infoLine">
              <div className="nameContainer">
                <div className="userName">
                  <div style={formInLineStyle}>
                    <Form.Group style={inLineFormComponent}>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="firstName"
                        title="firstName"
                        maxLength="20"
                        placeholder={this.state.FName}
                        onChange={this.onFormChange}
                      />
                      <Form.Group style={inLineFormComponent}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          required
                          type="lastName"
                          title="lastName"
                          maxLength="20"
                          placeholder={this.state.LName}
                          onChange={this.onFormChange}
                        />
                      </Form.Group>
                    </Form.Group>
                    <Form.Group style={inLineFormComponent}>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control
                        required
                        type="gender"
                        title="gender"
                        as="select"
                        onChange={this.onFormChange}
                        value={this.state.Gender}
                      >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

            <div className="descriptionLine">
              <a className="descriptionTitle">Address</a>
              <div className="addressBox">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    required
                    type="address"
                    title="address"
                    placeholder={this.state.Address}
                    maxLength="110"
                    onChange={this.onFormChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="descriptionLine">
              <a className="descriptionTitle">Telephone Number</a>
              <div className="addressBox">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    required
                    type="telNo"
                    title="telNo"
                    maxLength="10"
                    placeholder={this.state.TelNo}
                    onChange={this.onFormChange}
                  />
                </Form.Group>
              </div>
            </div>

            {localStorage.getItem("isTrainer") == 0 ? (
              <div>
                <div />
              </div>
            ) : (
              <div>
                <div className="descriptionLine">
                  <a className="descriptionTitle">Trainer Image Url</a>
                  <div className="addressBox">
                    <Form.Group style={defaultFormStyle}>
                      <Form.Control
                        required
                        type="trainerImg"
                        title="trainerImg"
                        placeholder={this.state.TrainerImg}
                        maxLength="250"
                        onChange={this.onFormChange}
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="descriptionLine">
                  <a className="descriptionTitle">Trainer Description</a>
                  <div className="addressBox">
                    <Form.Group style={defaultFormStyle}>
                      <Form.Control
                        required
                        maxLength="190"
                        type="trainerDescription"
                        title="trainerDescription"
                        placeholder={this.state.TrainerDescription}
                        onChange={this.onFormChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", marginTop: "20px" }}>
              <Button
                variant="primary"
                size="small"
                href="/myAccount"
                style={{ marginRight: "30px" }}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="small"
                type="submit"
                style={{ marginLeft: "auto" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const defaultFormStyle = {
  padding: "10px"
};

const shortFormStyle = {
  width: "60%",
  maxWidth: "60%"
};

const formInLineStyle = {
  display: "flex",
  flexDirection: "row"
};

const inLineFormComponent = {
  marginRight: "15px"
};

export default EditProfile;
