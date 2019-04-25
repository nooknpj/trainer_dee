import React, { Component } from "react";
import ClientAccount from "./ClientAccount";
import TrainerAccount from "./TrainerAccount";

export class MyAccount extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="box">
          <p className="pageHeader">My Account</p>
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
      </div>
    );
  }
}

export default MyAccount;
