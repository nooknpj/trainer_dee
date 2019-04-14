import React, { Component } from "react";
import LocationPicker from "react-location-picker";
import CourseItem from "../components/CourseItem";
import { Button } from "react-bootstrap";

export class CourseDescription extends Component {

    constructor(props) {
        super(props);

        this.state = {
            courseID: 0,
            cName: "courseName",
            service: 0,
            courseHour: 0,
            cost: 0,
            imageUrl: "",
            CourseDescription: "CourseDescription",
            lName: "locationName",
            lat: 13.736717,
            lng: 100.523186,
            rating: 0,
            fName: "firstName",
            lName: "lastName",
            gender: "M",
            telNo: "0000000000"
        }
    }

    componentDidMount() {
        this.getCourseData();
    }

    async getCourseData() {
        try {
            const courseID = { courseID: this.props.location.state };
            console.log(courseID)
            const response = await fetch("/trainer_dee/get_course_description", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(courseID)
            });

            const results = await response.json();
            const result = results[0];
            this.setState({
                courseID: result.courseID,
                cName: result.cName,
                service: result.service,
                courseHour: result.courseHour,
                cost: result.cost,
                imageUrl: result.imageUrl,
                courseDescription: result.courseDescription,
                locName: result.locName,
                lat: result.lat,
                lng: result.lng,
                rating: result.rating,
                fName: result.fName,
                lName: result.lName,
                gender: result.gender,
                telNo: result.telNo
            })
        } catch (error) {
            console.log("defaultFetchError : ", error);
        }
    }

    render() {
        return (
            <div className="addCourseBox">
                <p style={courseDescHeaderStyle}>Course Description</p>
                <div>
                    <CourseItem
                        courseID={this.state.courseID}
                        cName={this.state.cName}
                        service={this.state.service}
                        courseDescription={this.state.courseDescription}
                        cost={this.state.cost}
                        fName={this.state.fName}
                        lName={this.state.lName}
                        courseHour={this.state.courseHour}
                        gender={this.state.gender}
                        imageUrl={this.state.imageUrl}
                        rating={this.state.rating}
                    />
                    <div className="infoLine">
                        <span className="infoTitle">Telephone Number</span>
                        <span> {this.state.telNo}</span>
                    </div>
                    <div className="infoLine">
                        <span className="infoTitle">Course Location</span>
                        <span> {this.state.locName}</span>
                    </div>
                    <LocationPicker
                        containerElement={<div style={{ height: "100%" }} />}
                        mapElement={<div style={{ height: "400px" }} />}
                        defaultPosition={{ lat: this.state.lat, lng: this.state.lng }}
                        radius={-1}
                        zoom={18}
                    />
                    <div style={{ display: "Block" }}>
                        <Button variant="primary" size="small" type="submit">
                            Buy this course
                        </Button>
                    </div>
                </div>
            </div>



        );
    }
}

const courseDescHeaderStyle = {
    color: "white",
    fontSize: "30px",
    backgroundColor: "#2460A7",
    width: "20%",
    minWidth: "250px",
    textAlign: "center",
    borderRadius: "10px",
    fontWeight: "bold",
    // marginLeft: "50px"
};

export default CourseDescription;