import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ClientRegister from "./ClientRegister";
import TrainerRegister from "./TrainerRegister";

export class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      registerAs: "client"
    };
  }
  render() {
    return (
      <div style={tabsContainerStyle}>
        <Tabs
          className="tabsClass"
          style={tabStyle}
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab style={tabStyle} eventKey="client" title="Register as Client">
            <ClientRegister />
          </Tab>
          <Tab eventKey="trainer" title="Register as Trainer">
            <TrainerRegister />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const tabsContainerStyle = {
  fontSize: "15px",
  fontWeight: "bold",
  marginBottom: "20px"
};
const tabStyle = {};
export default Register;
