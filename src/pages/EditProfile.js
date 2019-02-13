import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/editProfile.css";
import { Redirect } from "react-router";

export class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      // redirectToNewPage: false
    };
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
      <div className="profileBox">
        <p style={editProfileHeaderStyle}>Edit Profile</p>

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
                        placeholder="Enter first name"
                        onChange={this.onFormChange}
                      />
                      <Form.Group style={inLineFormComponent}>
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          required
                          type="lastName"
                          title="lastName"
                          placeholder="Enter last name"
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
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
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
                    placeholder="Address"
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
                    placeholder="Telephone number"
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
                        placeholder="Your profile image url"
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
                        type="trainerDescription"
                        title="trainerDescription"
                        placeholder="Your Trainer Description"
                        onChange={this.onFormChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: "Block", marginTop: "20px" }}>
              <Button
                variant="primary"
                size="small"
                href="/myAccount"
                style={{ marginRight: "30px" }}
              >
                Back
              </Button>
              <Button variant="primary" size="small" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const editProfileHeaderStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "40%",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold"
};

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
