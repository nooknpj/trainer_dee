import React, { Component } from "react";
import ClientAccount from "./ClientAccount";
import TrainerAccount from "./TrainerAccount";

export class MyAccount extends Component {
  render() {
    return (
      <div>
        {localStorage.getItem("isTrainer") == 0 ? (
          <div>
            <ClientAccount />
          </div>
        ) : (
          <div>
            <TrainerAccount />
          </div>
        )}
      </div>
    );
  }
}

export default MyAccount;
