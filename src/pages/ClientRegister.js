import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import "../css/clientRegister.css";
const uuidv4 = require("uuid/v4");
export class ClientRegister extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      fName: "",
      lName: "",
      gender: "Male",
      telNo: "",
      address: "",
      userID: "",
      isTrainer: 0
    };
  }

  onFormChange = e => {
    this.state[e.target.title] = e.target.value;
  };

  onSubmitRegister = e => {
    e.preventDefault();
    this.state.userID = uuidv4().slice(24, 36);
    console.log(this.state);

    let data = (({
      userID,
      fName,
      lName,
      gender,
      telNo,
      address,
      isTrainer
    }) => ({ userID, fName, lName, gender, telNo, address, isTrainer }))(
      this.state
    );

    switch (data.gender) {
      case "Male":
        data.gender = "m";
        break;

      case "Female":
        data.gender = "f";
        break;

      case "Other":
        data.gender = "o";
        break;

      default:
        data.gender = "o";
    }
    console.log(data);
    this.fetchInsertRegisteredClient(this.state);
  };

  async fetchInsertRegisteredClient(e) {
    try {
      switch (e.gender) {
        case "Male":
          e.gender = "m";
          break;

        case "Female":
          e.gender = "f";
          break;

        case "Other":
          e.gender = "o";
          break;

        default:
          e.gender = "o";
      }
      
      console.log(JSON.stringify(e));
      const response = await fetch("/trainer_dee/insert_registeredClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
      });

      const results = await response.json();
      if (results.response == 200) {
        console.log("registerCompleted");
        window.location.href = "/";
      } else {
        console.log("failed. couldn't register user");
      }
    } catch (error) {
      console.log("Insert registered user failed", error);
    }
  }
  render() {
    return (
      <div className="registerBox">
        <p style={registerHeaderStyle}>Register as a Client</p>
        <Form onSubmit={this.onSubmitRegister}>
          <Form.Group style={shortFormStyle}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              title="email"
              placeholder="Enter email"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group style={shortFormStyle}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              title="password"
              placeholder="Password"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <div style={formInLineStyle}>
            <Form.Group style={inLineFormComponent}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="fName"
                title="fName"
                placeholder="First Name"
                onChange={this.onFormChange}
              />
            </Form.Group>

            <Form.Group style={inLineFormComponent}>
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                required
                type="lName"
                title="lName"
                placeholder="Last Name"
                onChange={this.onFormChange}
              />
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

          <Form.Group style={shortFormStyle}>
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control
              required
              type="telNo"
              title="telNo"
              placeholder="081234321"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="address"
              title="address"
              style={addressFormStyle}
              placeholder="1/23 Apple St. ,Bangkok, Thailand,10200"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <div style={{ display: "Block" }}>
            <Button variant="primary" size="small" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const registerHeaderStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "40%",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold"
};

const addressFormStyle = {};

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
export default ClientRegister;
