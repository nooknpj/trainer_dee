import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <div style={FooterStyle}>
        {/* <a className="FooterLink" href="/">
          Home
        </a>{" "}
        |{" "}
        <a className="FooterLink" href="/searchCourses">
          Search Courses
        </a> */}
        <div style={FooterDplopBox}>
          <a id="footerDplop">Trainer D By D'Plop</a>
        </div>
        <p style={{ fontSize: "1.2em" }}> Contact: D.plop4@gmail.com</p>
        <p> © Copyright. 2019 D'Plop Company. All rights reserved.</p>
      </div>
    );
  }
}

const FooterDplopBox = {
  marginTop: "10px",
  marginBottom: "10px"
};
const FooterStyle = {
  backgroundColor: "#414141",
  paddingTop: "20px",
  paddingBottom: "10px",
  textAlign: "center",
  color: "white"
};

export default Footer;
