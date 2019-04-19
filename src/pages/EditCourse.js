import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import "../css/editCourse.css";

export class EditCourse extends Component {
    constructor() {
        super();
        this.state = {

        };
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

    async fetchSaveCourse() {
        const data = this.state;
        try {
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
                            type="courseName"
                            title="courseName"
                            maxLength="30"
                            placeholder="Enter course name"
                            onChange={this.onFormChange}
                        />
                        <Form.Group>
                            <Form.Label>Course Description</Form.Label>
                            <Form.Control
                                required
                                type="courseDesc"
                                title="courseDesc"
                                maxLength="170"
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
                            placeholder="Enter course description"
                            onChange={this.onFormChange}
                        />
                    </Form.Group>
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