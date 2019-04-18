import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/upgradeTrainer.css";

export class UpgradeTrainer extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onFormChange = e => {
    this.state[e.target.title] = e.target.value;
    console.log(this.state);
  };

  onUpgrade = e => {
    this.fetchUpgrade();
    e.preventDefault();
    window.location = "/myAccount";
    return false;
  };

  async fetchUpgrade(e) {
    const data = this.state;
    try {
      data.clientID = localStorage.getItem("clientID");

      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/upgrade_to_trainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log("Upgrade failed", error);
    }
    localStorage.setItem("isTrainer", 1);

    // this.setState({ redirectToNewPage: true })
    // this.props.history.push('/myAccount');
  }

  render() {
    return (
      <div className="box">
        <p className="pageHeader">Upgrade to Trainer</p>
        {/* <span>My trainer status is </span>
        <span> {localStorage.getItem("isTrainer")} </span> */}
        <a className="infoTitle" style={{ color: "white" }}>
          SSN
        </a>
        <div className="upgradeInfoLine">
          <div className="upgradeInfoText">
            <Form.Group style={defaultFormStyle}>
              <Form.Control
                required
                type="ssn"
                title="ssn"
                placeholder="SSN"
                maxLength="13"
                onChange={this.onFormChange}
              />
            </Form.Group>
          </div>
        </div>
        <div id="upgradeInfo">
          <Form onSubmit={this.onUpgrade}>
            <div className="descriptionLine">
              <a className="descriptionTitle">Trainer Description</a>
              <div className="descriptionBox">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    required
                    maxLength="190"
                    type="trainerDesc"
                    title="trainerDesc"
                    placeholder="Trainer Description"
                    onChange={this.onFormChange}
                  />
                </Form.Group>
              </div>
              <a className="descriptionTitle">Trainer Image Url</a>
              <div className="descriptionBox">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    maxLength="250"
                    type="trainerImg"
                    title="trainerImg"
                    placeholder="Your profile image url."
                    onChange={this.onFormChange}
                  />
                </Form.Group>
              </div>

              {/* <a className="descriptionTitle">Certificate</a>
              <div className="descriptionBox">
                <Form.Group style={defaultFormStyle}>
                  <Form.Control
                    type="certificate"
                    title="certificate"
                    placeholder="Certificate"
                    onChange={this.onFormChange}
                  />
                </Form.Group> */}
              {/* </div> */}
            </div>

            <div style={{ display: "flex", marginTop: "20px" }}>
              <Button
                variant="primary"
                size="small"
                href="/myAccount"
                style={{ marginRight: "10px" }}
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

export default UpgradeTrainer;
