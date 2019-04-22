import React, { Component } from "react";
import "../css/component.css"

let url = window.location.pathname.split("/");

export class ResponseRequest extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false
        };
    }

    componentDidMount() {
        this.acceptRequest();
        setTimeout(function() { //Start the timer
            this.setState({redirect: true}) //After 5 second, set render to true
        }.bind(this), 5000)
    }

    async acceptRequest() {
        console.log(url);
        let responseRequest = url[1];
        let transactionID = url[2];
        let token = url[3];
        await fetch(`/trainer_dee/${responseRequest}/${transactionID}/${token}`);
    }

    render() {
        return (
            <div className="box">
                {this.state.redirect ? (
                    window.location = "/"
                ):(
                    <p>{url[1]}! Website will redirect to Home in 5 seconds.</p>
                )}
            </div>
        );
    }
}

export default ResponseRequest;
