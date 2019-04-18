import React, { Component } from "react";
import LocationPicker from "react-location-picker";
import { Form, Button } from "react-bootstrap";
import "../css/addCourse.css";

const defaultPosition = {
  lat: 13.736717,
  lng: 100.523186
};

const google = window.google;

export class AddCourse extends Component {
  componentDidMount() {
    this.setState({
      clientID: localStorage.getItem("clientID")
    });
    //this.getMockUpResult();
  }

  constructor(props) {
    super(props);

    this.state = {
      address: "Bangkok, Thailand",
      position: {
        lat: 13.736717,
        lng: 100.523186
      }
    };

    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange({ position, address }) {
    this.setState({ position, address });
  }

  onFormChange = e => {
    this.state[e.target.title] = e.target.value;
    console.log(this.state);
  };

  onAddCourse = e => {
    this.fetchInsertCourse(e);
    e.preventDefault();
    window.location = "/searchCourses";
  };

  async fetchInsertCourse(e) {
    try {
      const data = this.state;
      switch (data.service) {
        case "Yoga":
          data.service = "0";
          break;

        case "Cardio":
          data.service = "1";
          break;

        case "Weight Training":
          data.service = "2";
          break;

        default:
          data.service = "0";
      }

      console.log(JSON.stringify(data));
      const response = await fetch("/trainer_dee/add_course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.log("Add course failed", error);
    }
  }

  render() {
    return (
      <div className="box">
        <p className="pageHeader">Add course</p>
        <div>
          <Form onSubmit={this.onAddCourse}>
            <Form.Group style={shortFormStyle}>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                required
                type="courseName"
                title="courseName"
                maxLength="29"
                placeholder="Enter course name"
                onChange={this.onFormChange}
              />
            </Form.Group>
            <div style={formInLineStyle}>
              <Form.Group style={inLineFormComponent}>
                <Form.Label>Service</Form.Label>
                <Form.Control
                  required
                  type="service"
                  title="service"
                  as="select"
                  onChange={this.onFormChange}
                >
                  <option>Yoga</option>
                  <option>Cardio</option>
                  <option>Weight Training</option>
                </Form.Control>
              </Form.Group>
              <Form.Group style={inLineFormComponent}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="price"
                  title="price"
                  maxLength="10"
                  placeholder="Price"
                  onChange={this.onFormChange}
                />
              </Form.Group>
              <Form.Group style={inLineFormComponent}>
                <Form.Label>Course Hour</Form.Label>
                <Form.Control
                  required
                  type="courseHour"
                  title="courseHour"
                  maxLength="3"
                  placeholder="Course Hour"
                  onChange={this.onFormChange}
                />
              </Form.Group>
            </div>
            <Form.Group style={shortFormStyle}>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                required
                type="imageUrl"
                title="imageUrl"
                placeholder="Image URL"
                maxLength="1990"
                onChange={this.onFormChange}
              />
            </Form.Group>
            <Form.Group style={shortFormStyle}>
              <Form.Label>Course Description</Form.Label>
              <Form.Control
                required
                type="courseDescription"
                title="courseDescription"
                placeholder="Course Description"
                maxLength="165"
                onChange={this.onFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course location:</Form.Label><Form.Label className="selectedAddressText">{this.state.address}</Form.Label>
              <LocationPicker
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "400px" }} />}
                defaultPosition={defaultPosition}
                onChange={this.handleLocationChange}
                radius={100}
                zoom={18}
              />
            </Form.Group>

            <div style={{ display: "Block" }}>
              <Button variant="primary" size="small" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

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

export default AddCourse;
