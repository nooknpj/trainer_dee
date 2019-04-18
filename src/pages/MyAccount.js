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
        <div className="profileBox">
          <p style={profileHeaderStyle}>My Account</p>
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

const profileHeaderStyle = {
  color: "white",
  fontSize: "30px",
  backgroundColor: "#2460A7",
  width: "20%",
  minWidth: "250px",
  textAlign: "center",
  borderRadius: "10px",
  fontWeight: "bold"
};

export default MyAccount;
