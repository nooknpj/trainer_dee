import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReserveSession from "./ReserveSession";
import SessionItem from "../components/SessionItem";
import CourseItem from "../components/CourseItem";
import "../css/component.css";

export class MySession extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clientSessions: [],
      trainerSessions: []
    };
  }

  componentDidMount() {
    this.getClientSession();
    this.getTrainerSession();
  }

  async getClientSession() {
    // get clientID from localStorage and get sessions where this client is the client of the sessions and update the session list in state
    try {
      const data = { clientID: localStorage.getItem("clientID") };
      const response = await fetch("/trainer_dee/get_client_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();

      this.setState(
        {
          clientSessions: results
        },
        () => {
          console.log(this.state.clientSessions);
          return 200;
        }
      );
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  async getTrainerSession() {
    // get clientID from localStorage and get sessions where this client is the trainer of the sessions and update the session list in state
    try {
      const data = { clientID: localStorage.getItem("clientID") };
      const response = await fetch("/trainer_dee/get_trainer_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();

      this.setState(
        {
          trainerSessions: results
        },
        () => {
          console.log(this.state.trainerSessions);
          return 200;
        }
      );
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
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
          {localStorage.getItem("isTrainer") == 1 ? (
            <Tab
              style={tabStyle}
              eventKey="trainerSession"
              title="Trainer Sessions"
            >
              <div className="box">
                <p className="pageHeader">Trainer Sessions</p>
                {this.state.trainerSessions.length != 0 ? (
                  this.state.trainerSessions.map(sessionItem => (
                    <SessionItem
                      transactionID={sessionItem.transactionID}
                      sessionNo={sessionItem.sessionNo}
                      startTime={sessionItem.startTime}
                      duration={sessionItem.duration}
                      sessionStatus={sessionItem.sessionStatus}
                      cName={sessionItem.cName}
                      service={sessionItem.service}
                      fName={sessionItem.fName}
                      lName={sessionItem.lName}
                      telNo={sessionItem.telNo}
                      collegueRole="Client"
                    />
                  ))
                ) : (
                  <h5>No Trainer Sessions.</h5>
                )}
              </div>
            </Tab>
          ) : (
            <div />
          )}

          <Tab eventKey="clientSession" title="Client Sessions">
            <div className="box">
              <p className="pageHeader"> Client Sessions </p>

              {this.state.clientSessions.length != 0 ? (
                this.state.clientSessions.map(sessionItem => (
                  <SessionItem
                    transactionID={sessionItem.transactionID}
                    sessionNo={sessionItem.sessionNo}
                    startTime={sessionItem.startTime}
                    duration={sessionItem.duration}
                    sessionStatus={sessionItem.sessionStatus}
                    cName={sessionItem.cName}
                    service={sessionItem.service}
                    fName={sessionItem.fName}
                    lName={sessionItem.lName}
                    telNo={sessionItem.telNo}
                    collegueRole="Trainer"
                  />
                ))
              ) : (
                <h5>No client Sessions.</h5>
              )}
            </div>
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
export default MySession;
