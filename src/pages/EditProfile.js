import React, { Component } from "react";
import { Button, Form } from 'react-bootstrap';
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
  }

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

  render() {
    // if (this.state.redirectToNewPage) {
    //   return (
    //   <Redirect to="/myAccount"/>
    //   )
    // }
    return (
      <div className="profileBox">
        <p style={editProfileHeaderStyle}>Edit Profile</p>
        <span>My Client ID is </span>
        <span> {localStorage.getItem("clientID")} </span>

        <div id="profileInfo">
          <Form onSubmit={this.onSaveProfile}>
            <div className="infoLine">
              <div className="nameTitleContainer">
                <a className="infoTitle">Name</a>
              </div>
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

            <div className="infoLine">
              <div className="infoTitleContainer">
                <a className="infoTitle">Telephone Number</a>
              </div>
              <div className="infoText">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    required
                    type="telNo"
                    title="telNo"
                    placeholder="Tel No."
                    onChange={this.onFormChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div style={{ display: "Block" }}>
              <Button variant="primary" size="small" type="submit">Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    )
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
}

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