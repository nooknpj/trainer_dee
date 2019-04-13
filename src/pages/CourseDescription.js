import React, { Component } from "react";

export class CourseDescription extends Component {

    constructor(props) {
        super(props);
      }

    render(){
        return(
            <div>
                {console.log(this.props.location.state)}
                <p>{this.props.location.state.cName}</p>
                <p>{this.props.location.state.fName}</p>
                <p>{this.props.location.state.lName}</p>
                <p>{this.props.location.state.courseDescription}</p>
            </div>
            
            
            
        );
    }
}

export default CourseDescription;