import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/editCourse.css";
import Switch from "react-switch";

export class EditCourse extends Component {
    constructor() {
        super();
        this.state = {
            courseID: 0,
            trainerID: "0000000000",
            // cName: "courseName",
            imageUrl: "",
            CourseDescription: "CourseDescription",
            courseStatus: false
        };
        this.handleToggleChange = this.handleToggleChange.bind(this);
    }

    componentDidMount() {
        this.getCourseData();
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

    onFormChange = e => {
        this.state[e.target.title] = e.target.value;
        console.log(this.state);
    };

    onSaveCourse = e => {
        this.fetchSaveCourse();
        e.preventDefault();
        window.location = document.referrer;
    }

    handleToggleChange(checked) {
        this.setState({ courseStatus: checked });
    }

    // async fetchLoadCourseVisibility() {
    //     try {
    //         const data = this.state;
    //         data.courseID = document.referrer.split("/")[4]
    //         console.log(data)

    //         const response = await fetch("/trainer_dee/get_course_visibility", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(data)
    //         });

    //         const results = await response.json();
    //         console.log(results)
    //         this.setState({
    //             courseStatus: results[0].courseStatus == 1 ? true : false
    //         })
    //         console.log(this.state.courseStatus)
    //     } catch (error) {
    //         console.log("Fetch course visibility failed", error);
    //     }
    // }

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
                        {console.log(this.state.cName)}
                        <Form.Group>
                            <Form.Label>Course Description</Form.Label>
                            <Form.Control
                                required
                                type="courseDescription"
                                title="courseDescription"
                                maxLength="170"
                                defaultValue={this.state.courseDescription}
                                placeholder="Enter course description"
                                onChange={this.onFormChange}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            required
                            type="imageUrl"
                            title="imageUrl"
                            maxLength="170"
                            defaultValue={this.state.imageUrl}
                            placeholder="Enter course description"
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
                    <Form.Label>Show/Hide Course</Form.Label>
                    <Switch onChange={this.handleToggleChange} checked={this.state.courseStatus} />
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