import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import ReserveSession from "./ReserveSession";
import CourseItem from "../components/CourseItem";

export class MyCourse extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            attendedCourse: [],
            createdCourse: []
        };
    }

    componentDidMount() {
        this.getAttendedCourse();
        this.getCreatedCourse();
    }

    async getAttendedCourse() {
        //TODO: Query client's bought/request courses from db and insert into this.state.attendedCourse
    }

    async getCreatedCourse() {
        try {
            const data = { trainerID: localStorage.getItem("clientID") };
            const response = await fetch("/trainer_dee/view_created_course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const results = await response.json();
            this.setState({
                createdCourse: results
            })
            console.log(this.state.createdCourse);
        } catch (error) {
            console.log("defaultFetchError : ", error);
        }
    }

    render() {
        return (
            <div style={tabsContainerStyle}>
                <Tabs
                    className="tabsClass"
                    style={tabStyle}
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab style={tabStyle} eventKey="created" title="Created Course">
                        <div className="profileBox">
                            <p style={myCourseHeaderStyle}>Created Course</p>
                            {this.state.createdCourse.length != 0 ? (
                                this.state.createdCourse.map(courseItem => (
                                    <CourseItem
                                        courseID={courseItem.CourseID}
                                        cName={courseItem.CName}
                                        service={courseItem.Service}
                                        courseDescription={courseItem.CourseDescription}
                                        cost={courseItem.Cost}
                                        courseHour={courseItem.CourseHour}
                                        imageUrl={courseItem.ImageUrl}
                                    />
                                ))
                            ) : (
                                    <h5>No created course.</h5>
                                )}
                        </div>

                    </Tab>
                    <Tab eventKey="attended" title="Attended Course">
                        <div className="profileBox">
                            <p style={myCourseHeaderStyle}>Attended Course</p>

                            {this.state.attendedCourse.length != 0 ? (
                                this.state.attendedCourse.map(courseItem => (
                                    <CourseItem
                                        courseID={courseItem.courseID}
                                        cName={courseItem.cName}
                                        service={courseItem.service}
                                        courseDescription={courseItem.courseDescription}
                                        cost={courseItem.cost}
                                        fName={courseItem.fName}
                                        lName={courseItem.lName}
                                        courseHour={courseItem.courseHour}
                                        gender={courseItem.gender}
                                        imageUrl={courseItem.imageUrl}
                                        rating={courseItem.rating}
                                    />
                                ))
                            ) : (
                                    <h5>No attended course.</h5>
                                )}
                        </div>
                        <ReserveSession />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

const myCourseHeaderStyle = {
    color: "white",
    fontSize: "30px",
    backgroundColor: "#2460A7",
    width: "25%",
    minWidth: "250px",
    textAlign: "center",
    borderRadius: "10px",
    fontWeight: "bold"
};

const tabsContainerStyle = {
    fontSize: "15px",
    fontWeight: "bold",
    marginBottom: "20px"
};
const tabStyle = {};
export default MyCourse;