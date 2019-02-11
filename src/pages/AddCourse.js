import React, { Component } from "react";
import LocationPicker from 'react-location-picker';
import { Form, Button } from 'react-bootstrap';
import "../css/addCourse.css";

const defaultPosition = {
    lat: 13.736717,
    lng: 100.523186
};

const google = window.google

export class AddCourse extends Component {

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
        e.preventDefault();
        console.log(this.state);
    }

    addCourse = () => {
        console.log(this.state)
    }

    render() {
        return (
            <div className="addCourseBox">
                <p style={addCourseHeaderStyle}>Add course</p>
                <div>
                    <Form onSubmit={this.onAddCourse}>
                        <Form.Group style={shortFormStyle}>
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                title="coursename"
                                placeholder="Enter course name"
                                onChange={this.onFormChange}
                            />
                        </Form.Group>
                        <Form.Group style={shortFormStyle}>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                title="price"
                                placeholder="Price"
                                onChange={this.onFormChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Course location: {this.state.address}</Form.Label>
                            <LocationPicker
                                containerElement={<div style={{ height: '100%' }} />}
                                mapElement={<div style={{ height: '400px' }} />}
                                defaultPosition={defaultPosition}
                                onChange={this.handleLocationChange}
                                radius={100}
                                zoom={18}
                            />

                        </Form.Group>


                    </Form>

                    <Button onClick={this.addCourse}>Add</Button>
                </div>
            </div>
        );
    }
}


const addCourseHeaderStyle = {
    color: "white",
    fontSize: "30px",
    backgroundColor: "#2460A7",
    width: "40%",
    textAlign: "center",
    borderRadius: "10px",
    fontWeight: "bold"
};

const shortFormStyle = {
    width: "60%",
    maxWidth: "60%"
};

export default AddCourse;
