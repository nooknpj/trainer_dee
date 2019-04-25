import React, { Component } from "react";
import "../css/Home.css";
import firstImg from "../img/girl_training.jpg";
import secondImg from "../img/training.jpg";
export class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        <h style={headerStyle}> Welcome to a healthier life</h>

        <div
          id="homeItemContainer"
        // style={{
        //   paddingTop: "20px",
        //   paddingBottom: "20px",
        //   display: "flex",
        //   flexDirection: "row",
        //   marginTop: "30px",
        //   backgroundColor: "#8C857B"
        // }}
        >
          <div id="homeImageContainer">
            <img src={firstImg} className="homeImage"/>
          </div>


          <div>
            <h style={headerStyle}>What is Trainer D?</h>
            <p style={paragraphStyle}>
              Trainer D is a platform for clients who want help from personal
              fitness trainers and personal trainer to meet.{" "}
            </p>
            <p style={paragraphStyle}>
              Trainer D helps clients search for training courses to help them
              in the aspect that they need. Clients are able to search for
              courses using keywords and filters to get the courses that best
              match their desire!
            </p>

            <p style={paragraphStyle}>
              Trainer d helps trainers reach more clients by providing a
              platform to add their training courses. They can also provide
              basic information about themselves and the courses so that they
              can reach their targets!
            </p>
          </div>
        </div>

        <div
          id="homeItemContainer"
          // style={{
          //   paddingTop: "20px",
          //   paddingBottom: "20px",
          //   display: "flex",
          //   flexDirection: "row",
          //   marginTop: "30px",
          //   backgroundColor: "#919D9D"
          // }}
        >
          <div>
            <h style={headerStyle}>Why Trainer D?</h>
            <p style={paragraphStyle}>
              Lately, more and more people are trying to take a better care of
              their health whether the goal is to lose weight, to get in shape
              or just to achieve a healthier life. And one of the most important
              factors that could help in achieving that is proper physical
              exercise. Proper physical exercise requires attention in many
              different aspects of our body, of which many people are not aware
              of or they are doing it wrong. So, it’s a good idea to get help
              from a personal trainer who could help and instruct a proper way
              to exercise that can be adjusted for each individual. But for
              people who don’t have a lot of connections with personal trainers,
              it could be hard to find one for them. So, we decided to create a
              match-maker platform where clients and trainers can contact each
              other.
            </p>
          </div>

          <div id="homeImageContainer">
          <img
            className="homeImage"
            src={secondImg}
            // style={{
            //   marginRight: "20px",
            //   maxWidth: "40%",
            //   height: "auto",
            //   maxHeight: "500px",
            //   borderRadius: "10px"
            // }}
          />
          </div>
        </div>
      </div>
    );
  }
}

const headerStyle = {
  paddingLeft: "40px",
  paddingTop: "20px",
  textAlign: "left",
  fontSize: "35px",
  fontWeight: "bold"
};

const paragraphStyle = {
  paddingLeft: "40px",
  paddingRight: "40px",
  paddingTop: "10px",
  textAlign: "left",
  fontSize: "25px"
};

export default Home;
