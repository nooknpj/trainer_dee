import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";
import MyToggleButton from "../components/MyToggleButton";
import LocationPicker from 'react-location-picker';
import Geosuggest from 'react-geosuggest';
import {Button} from 'react-bootstrap';

const defaultPosition = {
  lat: 13.736717,
  lng: 100.523186
};

const google = window.google

export class TestCss extends Component {

  constructor(props) {
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

  handleLocationChange({ position, address }) {
    this.setState({ position, address });
  }

  addCourse = () => {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <h1>Add courses</h1>
        <h2>{this.state.address}</h2>
        <div>
          <LocationPicker
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '400px' }} />}
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
            radius={100}
            zoom={18}
          />
          <Button onClick={this.addCourse}>Add</Button>
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
