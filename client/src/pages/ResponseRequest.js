import React, { Component } from "react";
import "../css/component.css"

let url = window.location.pathname.split("/");

export class ResponseRequest extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirect: false,
            isInvalid: 0
        };
    }

    componentDidMount() {
        this.acceptRequest();
    }

    async acceptRequest() {
        console.log(url);
        let responseRequest = url[1];
        let transactionID = url[2];
        let token = url[3];
        const response = await fetch(`/trainer_dee/${responseRequest}/${transactionID}/${token}`);
        if(response.status == 450){
            this.setState({
                isInvalid: 1
            });
        } else{
            setTimeout(function() { //Start the timer
                this.setState({redirect: true}) //After 5 second, set render to true
            }.bind(this), 5000)
        }
    }

    render() {
        return (
            <div className="box">
            {this.state.isInvalid ?(
                <p>Invalid token!</p>
            ):(
                this.state.redirect ? (
                    window.location = "/"
                ):(
                    <p>Website will redirect to Home in 5 seconds if {url[1]} is finished.</p>
                )
            )}
            </div>
        );
    }
}

export default ResponseRequest;
