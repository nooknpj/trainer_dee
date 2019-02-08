import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";
import MyToggleButton from "../components/MyToggleButton";
import LocationPicker from 'react-location-picker';

const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};

export class TestCss extends Component {

  constructor (props) {
    super(props);
 
    this.state = {
      address: "Bangkok",
      position: {
         lat: 13.736717,
         lng: 100.523186
      }
    };
 
    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange ({ position, address }) {
 
    // Set new location
    this.setState({ position, address });
  }

  render() {
    return (
      <div>
        <a className="aHover"> hello </a>
        <h1>{this.state.address}</h1>
        <div>
          <LocationPicker
            containerElement={ <div style={ {height: '100%'} } /> }
            mapElement={ <div style={ {height: '400px'} } /> }
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
            radius={10000}
          />
        </div>  
      </div>
    );
  }
}
const searchContainerStyle = {
  display: "flex",
  flexDirection: "row"
};

const coursesBoxContainerStyle = {
  backgroundColor: "white"
};
export default TestCss;
