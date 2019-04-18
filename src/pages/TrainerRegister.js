import React, { Component } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";

import "../css/register.css";
const uuidv4 = require("uuid/v4");
export class TrainerRegister extends Component {
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
      clientID: "",
      isTrainer: 1,
      ssn: "",
      trainerDescription: "",
      trainerImg: "",
      showRegisterSuccessful: 0,
      showEmailAlreadyUsed: 0
    };
  }

  onFormChange = e => {
    this.state[e.target.title] = e.target.value;
    console.log(this.state);
  };

  onSubmitRegister = e => {
    this.setState({
      showEmailAlreadyUsed: 0
    });
    e.preventDefault();
    this.state.clientID = uuidv4().slice(24, 36);
    this.state.email = this.state.email.toLocaleLowerCase();
    console.log(this.state);
    let status = this.fetchInsertRegisteredClient(this.state);
  };
  async fetchInsertTrainer(e) {
    const response = await fetch("/trainer_dee/insert_registeredTrainer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(e)
    });
    console.log(response);
  }

  // fetchInsertRegisteredClient is the same function as in register as a client (check if email already exists in authen if not then add to client)
  // but it will also call fetchInsertRegisteredTrainer(insert into trainer) if the previous was successful
  async fetchInsertRegisteredClient(e) {
    try {
      switch (e.gender) {
        case "Male":
          e.gender = "M";
          break;

        case "Female":
          e.gender = "F";
          break;

        case "Other":
          e.gender = "O";
          break;

        default:
          e.gender = "O";
      }

      console.log(JSON.stringify(e));
      const response = await fetch("/trainer_dee/insert_registeredClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
      });
      if (response.status == 450) {
        console.log("EmailAlreadyUsed");
        this.setState({
          showEmailAlreadyUsed: 1
        });
        return 450;
      }
      if (response.status == 200) {
        this.fetchInsertTrainer(e);
        console.log("registerCompleted");
        this.setState({
          showRegisterSuccessful: 1
        });
        return 200;
      } else {
        console.log("failed. couldn't register user");
      }
    } catch (error) {
      console.log("Insert registered user failed", error);
    }
  }
  render() {
    return (
      <div className="box">
        <Modal className="modalStyle" show={this.state.showRegisterSuccessful}>
          <Modal.Header>
            <Modal.Title>Register as Trainer Successful!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {" "}
              You can now use your email and password to login as a trainer.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <a className="homeLink" href="/">
              {" "}
              Home{" "}
            </a>
          </Modal.Footer>
        </Modal>

        <p className="pageHeader">Register as a Trainer</p>
        <Form onSubmit={this.onSubmitRegister}>
          <Form.Group style={shortFormStyle}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type="email"
              title="email"
              placeholder="Enter email"
              maxLength="40"
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
              maxLength="20"
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
                maxLength="20"
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
                maxLength="20"
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
            <Form.Label>SSN</Form.Label>
            <Form.Control
              required
              type="ssn"
              title="ssn"
              placeholder="Your Social Security Number (or CitizenID)"
              maxLength="14"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group style={shortFormStyle}>
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control
              required
              type="telNo"
              title="telNo"
              placeholder="081234321"
              maxLength="10"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              title="address"
              placeholder="1/23 Apple St. ,Bangkok, Thailand,10200"
              maxLength="110"
              onChange={this.onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Trainer Description</Form.Label>
            <Form.Control
              required
              type="textarea"
              title="trainerDescription"
              placeholder="Describe yourself."
              maxLength="190"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profile Image Url</Form.Label>
            <Form.Control
              required
              type="textarea"
              title="trainerImg"
              placeholder="url of your profile image. Use your real image for more creditability!"
              maxLength="190"
              onChange={this.onFormChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Trainer Certificate (optional)</Form.Label>
            <Form.Control
              required
              type="textarea"
              title="trainerDescription"
              disabled
              placeholder="If you have any certificate relating to personal training, you can add it here for more creditability."
              maxLength="190"
              // onChange={this.onFormChange}
            />
          </Form.Group>

          <div style={{ display: "flex" }}>
            <Alert show={this.state.showEmailAlreadyUsed} variant="danger">
              This email is already used. Please try other emails.
            </Alert>
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
    );
  }
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
export default TrainerRegister;
