import React, { Component } from "react";
import starIcon from "../img/star.png";
import "../css/courseItem.css";
import { Link } from "react-router-dom"
import { Table, Button, Modal } from "react-bootstrap";
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';


export class CourseItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coursesClient: [],
      showRate: 0,
      rating: 2.5
    }
  }

  getService = () => {
    let serviceCode = this.props.service;
    if (serviceCode == 0) return "Yoga";
    if (serviceCode == 1) return "Cardio";
    if (serviceCode == 2) return "WeightTraining";
  };

  componentDidMount() {
    this.getCoursesClient();
  }

  handleChange = (event, value) => {
    this.setState({ rating: Math.round( value * 10 ) / 10 });
  };

  onRateClick = () => {
    this.setState({ showRate: 1 });
  }

  onSubmitRateClick = () => {
    this.fetchUpdateRating();
  }

  async fetchUpdateRating() {
    try {
      const data = { clientID: localStorage.getItem("clientID"), courseID: this.props.courseID, rating: (this.state.rating + (this.props.rating * this.props.rateCount)) / parseFloat((this.props.rateCount + 1)), trainerID: this.props.trainerID, rateCount: this.props.rateCount + 1 };
      const response = await fetch("/trainer_dee/update_rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      this.setState({ showRate: 0 });
      window.location = "/myCourse"
    } catch (error) {
      console.log("Update rating failed", error);
    }
  }

  onRateSuccess = () => {
    this.setState({ showRate: 0 });

  };

  async getCoursesClient() {
    try {
      const data = { courseID: this.props.courseID };
      const response = await fetch("/trainer_dee/get_courses_client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const results = await response.json();
      this.setState({
        coursesClient: results
      })
      console.log(this.state.coursesClient);
    } catch (error) {
      console.log("defaultFetchError : ", error);
    }
  }

  getGenderStyle = () => {
    let genderStyle = {
      backgroundColor: "green",
      color: "white",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderRadius: "5px",
      marginRight: "5px",
      marginLeft: "5px",
      align: "center",
      maxHeight: "30px"
    };
    if (this.props.gender == "M") {
      genderStyle["backgroundColor"] = "#0084D5";
    } else if (this.props.gender == "F") {
      genderStyle["backgroundColor"] = "#EF6079";
    }

    return genderStyle;
  };

  render() {
    return (
      <div id="courseItem">
        <div id="courseImgContainer">
          <img className="courseImg" src={this.props.imageUrl} width="100%" />

          {/* <p> {this.props.imageUrl} </p> */}
        </div>

        <div id="courseItemInfo">
          <div id="courseHeaderContainer">
            <div id="courseTitleContainer">
              {/* <a href={'/courseDesc:'+ this.props.cName} className="courseTitle">
                {" "}
                {this.props.cName}{" "}
              </a> */}
              <Link to={{ pathname: `/courseDesc/${this.props.courseID}`, state: this.props.courseID }} className="courseTitle">
                {" "}
                {this.props.cName}{" "}
              </Link>
            </div>
            <div id="courseServiceContainer">
              <p className="courseService"> {this.getService()} </p>
            </div>
          </div>

          <div className="infoLine">
            {window.location.pathname != "/myCourse" || (window.location.pathname == "/myCourse" && this.props.isAttendedPage == 1) ? (
              <div className="trainerInfoContainer">
                <div>
                  <span className="infoTitle"> Trainer</span>
                  <a> {this.props.fName}</a>
                  <a> {this.props.lName} </a>
                </div>
                <div style={this.getGenderStyle()}>
                  <a> {this.props.gender}</a>
                </div>

                <div className="ratingContainer">
                  <a style={{ marginRight: "5px" }}>
                    {" "}
                    {this.props.rating.toFixed(1)}
                  </a>
                  <img style={starIconStyle} src={starIcon} />
                </div>
              </div>
            ) : (
                <div />
              )}

          </div>

          <div className="descriptionLine">
            <a className="descriptionTitle"> Course Description</a>
            <div className="courseDescriptionBox">
              <a> {this.props.courseDescription} </a>
            </div>
          </div>

          <div className="infoLine">
            <div className="infoContainer">
              <span className="infoTitle"> Course Duration</span>
              <span> {this.props.courseHour}</span>
              <span> Hours</span>
            </div>

          </div>

          <div className="infoLine">
            <div className="infoContainer">
              <span className="infoTitle"> Course Cost</span>
              <span> {this.props.cost}</span>
              <span> Baht</span>
            </div>

          </div>
          {(window.location.pathname == "/myCourse" && this.props.isAttendedPage == 1) ? (
            <div>
              <div className="infoLine">
                <div className="infoContainer">
                  <span className="infoTitle">Status</span>
                  <span> {this.props.status}</span>
                </div>
              </div>
              {this.props.status == "finished" ? (
                <div style={{ display: "flex", marginTop: "20px" }}>
                  <Button
                    variant="primary"
                    size="small"
                    type="submit"
                    style={{ marginLeft: "auto", marginRight: "15px" }}
                    href="javascript:void(0);"
                    onClick={this.onRateClick}
                  >
                    Rate
                </Button>
                </div>
              ) : (
                  <div />
                )}

            </div>

          ) : (
              <div />
            )}
          {(window.location.pathname.includes("/courseDesc") && this.props.trainerID == localStorage.getItem("clientID")) || (window.location.pathname == "/myCourse" && this.props.isAttendedPage != 1) ? (
            <div className="infoLine">
              <div className="infoContainer">
                <span className="infoTitle">Course Status</span>
                <span> {this.props.courseStatus == 1 ? "Show" : "Hide"}</span>
              </div>
            </div>
          ) : (
              <div />
            )}
          <div className="">
            {window.location.pathname == "/myCourse" && this.props.isAttendedPage != 1 ? (
              <div className="descriptionLine">
                <a className="descriptionTitle">Attended Client</a>
                <div className="courseDescriptionBox">
                  <Table responsive hover size="sm">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Telephone No.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.coursesClient.map(courseClient => (
                        <tr>
                          <td>{courseClient.fName}</td>
                          <td>{courseClient.lName}</td>
                          <td>{courseClient.telNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>

            ) : (
                <div />
              )}
          </div>
        </div>

        <Modal show={this.state.showRate} onHide={this.onRateSuccess}>
          <Modal.Header closeButton>
            <Modal.Title>Rate Trainer {this.props.fName} {this.props.lName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Rating: {this.state.rating}</p>

            <Slider
              value={this.state.rating}
              min={0.0}
              max={5.0}
              step={0.1}
              onChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSubmitRateClick}
            >
              Rate
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const starIconStyle = {
  maxWidth: "1em",
  maxHeight: "1em",
  align: "center",
  paddingTop: "1px",
  paddingBottom: "3px"
};

const styles = {
  root: {
    width: 300,
  },
  slider: {
    padding: '22px 0px',
  },
};
//CourseItemProps;
// CourseID={courseItem.CourseID}
// CName={courseItem.CName}
// Service={courseItem.Service}
// CourseDescription={courseItem.CourseDescription}
// Cost={courseItem.Cost}
// TrainerID={courseItem.TrainerID}
// CourseHour={courseItem.CourseHour}
// ImageUrl={courseItem.Image}

export default withStyles(styles)(CourseItem);
