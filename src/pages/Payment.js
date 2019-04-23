import React, { Component } from "react";
import "../css/component.css"
import { Button, Form } from "react-bootstrap";

export class Payment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            courseID: 0,
            trainerID: "0000000000",
            cName: "courseName",
            cost: 0
        }
    }

    componentDidMount() {
        this.getCourseData();
    }

    async getCourseData() {
        try {
            let courseID = { courseID: sessionStorage.getItem("courseID") };
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
                    cost: result.cost
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

    onPay = e => {
        e.preventDefault();
        this.fetchPayCourse();
    }

    async fetchPayCourse() {
        try {
            console.log("TEST")
            const data = { clientID: localStorage.getItem("clientID"), courseID: sessionStorage.getItem("courseID") };

            const response = await fetch("/trainer_dee/confirmPayment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.status == 200) {
                alert('Payment success!')
                window.location = "/myCourse";
            } else {
                alert('Payment failed!')
            }
        } catch (error) {
            console.log("Edit course failed", error);
        }
    }

    render() {
        return (
            <div className="box">
                {console.log(sessionStorage.getItem("courseID"))}
                <p className="pageHeader">Payment</p>
                <Form onSubmit={this.onPay} className="payInfoArea">
                    <p>Course name: {this.state.cName}<br></br>Price: {this.state.cost} Baht</p>
                    <Form.Group>
                        <div style={creditCardInLine}>
                            <Form.Group style={creditCardNameInLineComponent}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    type="fName"
                                    title="fName"
                                    maxLength="30"
                                    placeholder="Enter first name"
                                    onChange={this.onFormChange}
                                />
                            </Form.Group>
                            <Form.Group style={creditCardNameInLineComponent}>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    required
                                    type="lName"
                                    title="lName"
                                    maxLength="30"
                                    placeholder="Enter last name"
                                    onChange={this.onFormChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={creditCardInLine}>
                            <Form.Group style={creditCardPropsInLineComponent}>
                                <Form.Label>Credit Card Number</Form.Label>
                                <Form.Control
                                    required
                                    type="creditCardNo"
                                    title="creditCardNo"
                                    maxLength="16"
                                    placeholder="Enter credit card number"
                                    onChange={this.onFormChange}
                                />
                            </Form.Group>
                            <Form.Group style={creditCardSmallPropsInLineComponent}>
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    required
                                    type="cvv"
                                    title="cvv"
                                    maxLength="3"
                                    placeholder="CVV"
                                    onChange={this.onFormChange}
                                />
                            </Form.Group>
                            <Form.Group style={creditCardPropsInLineComponent}>
                                <Form.Label>Expire date</Form.Label>
                                <Form.Control
                                    required
                                    type="month"
                                    title="month"
                                    placeholder="Enter expire date"
                                    onChange={this.onFormChange}
                                />
                            </Form.Group>
                        </div>
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
                            Pay
                        </Button>
                    </div>
                </Form>
            </div>

        );
    }
}

const creditCardInLine = {
    display: "flex",
    flexDirection: "row"
};

const creditCardNameInLineComponent = {
    marginRight: "15px"
};

const creditCardPropsInLineComponent = {
    marginRight: "15px"
};

const creditCardSmallPropsInLineComponent = {
    marginRight: "15px",
    width: "100px"
};

export default Payment;