import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/editCourse.css";
import Switch from "react-switch";
import ScheduleSelector from "react-schedule-selector";

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export class EditCourse extends Component {
    constructor() {
        super();
        this.state = {
            courseID: 0,
            trainerID: "0000000000",
            // cName: "courseName",
            imageUrl: "",
            CourseDescription: "CourseDescription",
            courseStatus: false,
            schedule: []
        };
        this.handleToggleChange = this.handleToggleChange.bind(this);
    }

    componentDidMount() {
        this.getCourseData();
        this.getTrainerTimeTable();
    }

    async getCourseData() {
        try {
            let courseID = {};
            if (this.props.location.state == undefined) {
                courseID = { courseID: document.referrer.split("/")[4] };
            } else {
                courseID = { courseID: this.props.location.state };
            }
            const response = await fetch("/trainer_dee/get_course_description", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(courseID)
            });

            const results = await response.json();
            if (results.length != 0) {
                const result = results[0];

                this.setState({
                    courseID: result.courseID,
                    trainerID: result.trainerID,
                    cName: result.cName,
                    imageUrl: result.imageUrl,
                    courseDescription: result.courseDescription,
                    courseStatus: result.courseStatus
                });
            }
        } catch (error) {
            console.log("defaultFetchError : ", error);
        }
    }

    async getTrainerTimeTable(){
        try {
            let data = {clientID: localStorage.getItem("clientID")}
            const response = await fetch("/trainer_dee/get_trainer_timetable", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const results = await response.json();
            if (results.length != 0) {
                let timestamp = [];
                let dateTime = [];
                for(let i = 0; i < results.length; i++){
                    timestamp.push(results[i].startTime);
                    timestamp.push(results[i].endTime);
                    let duration = (new Date(results[i].endTime).getTime() - new Date(results[i].startTime).getTime())/3600000
                    for(let j = 1; j < duration; j++){
                        timestamp.push(new Date(results[i].startTime).getTime() + 3600000*j);
                    }
                }
                for(let i = 0; i < timestamp.length; i++){
                    dateTime.push(new Date(timestamp[i]).addHours(7));
                }
                this.setState({
                    schedule: dateTime
                });
            }
        } catch (error) {
            console.log("defaultFetchError : ", error);
        }
    }

    onFormChange = e => {
        this.state[e.target.title] = e.target.value;
        console.log(this.state);
    };

    onSaveCourse = e => {
        this.fetchSaveCourse();
        this.fetchSaveTimeTable();
        e.preventDefault();
        window.location = document.referrer;
    }

    handleToggleChange = checked => {
        this.setState({ courseStatus: checked });
    }

    handleScheduleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
        console.log(this.state)
    }

    renderCustomDateCell = (time, selected, innerRef) => (
        <div style={{ textAlign: 'center' }} ref={innerRef}>
          {selected ? '✅' : '☐'}
        </div>
      )

    async fetchSaveTimeTable(){
        try {
            this.state.schedule.sort(function(a,b){
                return b.date - a.date;
              });
            let dateTime = [this.state.schedule[0], this.state.schedule[this.state.schedule.length - 1]]; // contains startTime and endTime
            let timestamp = [];
            console.log(`line 128 date time >>> ${dateTime} `);
            for(let i = 1; i < this.state.schedule.length; i++){
                if(this.state.schedule[i] - this.state.schedule[i-1] > 3600000){
                    dateTime.push(this.state.schedule[i-1]);
                    dateTime.push(this.state.schedule[i]);
                }
            }
            console.log(`line 139  date time >>> ${dateTime} `);
            for(let i =0; i < dateTime.length; i++){
                timestamp.push(dateTime[i].toJSON().slice(0, 19).replace('T', ' '));
            }
            console.log(`line 139  date time >>> ${dateTime} `);
            timestamp.sort();
            console.log(`line 141  date time >>> ${dateTime} `);
            const data = {clientID: localStorage.getItem("clientID"), timestamp: timestamp};

            const response = await fetch("/trainer_dee/set_trainer_timetable", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("Edit timetable failed", error);
        }
    }

    async fetchSaveCourse() {
        try {
            const data = this.state;
            data.courseID = document.referrer.split("/")[4]
            console.log(data.courseID)

            const response = await fetch("/trainer_dee/edit_course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.log("Edit course failed", error);
        }
    }

    render() {
        return (
            <div className="box">
                <p className="pageHeader">Edit Course</p>
                <Form onSubmit={this.onSaveCourse} className="editInfoArea">
                    <Form.Group>
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            required
                            type="cName"
                            title="cName"
                            maxLength="30"
                            defaultValue={this.state.cName}
                            placeholder="Enter course name"
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Description</Form.Label>
                        <Form.Control
                            required
                            type="courseDescription"
                            title="courseDescription"
                            maxLength="200"
                            defaultValue={this.state.courseDescription}
                            placeholder="Enter course description"
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            required
                            type="imageUrl"
                            title="imageUrl"
                            maxLength="2000"
                            defaultValue={this.state.imageUrl}
                            placeholder="Enter course description"
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    <Form.Label>Show/Hide Course</Form.Label>
                    <Switch onChange={this.handleToggleChange} checked={this.state.courseStatus} />

                    <div className="descriptionLine">
                        <a className="descriptionTitle">Select range of time</a>
                        <div className="courseDescriptionBox">
                            <div>
                                <ScheduleSelector
                                    selection={this.state.schedule}
                                    onChange={this.handleScheduleChange}
                                    numDays={8}
                                    minTime={0}
                                    maxTime={23}
                                    dateFormat="ddd M/D"
                                    renderDateCell={this.renderCustomDateCell}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <Button
                            variant="primary"
                            size="small"
                            href={document.referrer}
                            style={{ marginRight: "30px" }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="primary"
                            size="small"
                            type="submit"
                            style={{ marginLeft: "auto" }}
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}