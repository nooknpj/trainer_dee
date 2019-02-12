import React, { Component } from "react";

export class MyAccount extends Component {
  render() {
    return (
      <div>
        <span>My Client id is </span>
        <span> {localStorage.getItem("clientID")} </span>
      </div>
    );
  }
}

export default MyAccount;
