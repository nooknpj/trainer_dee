import React, { Component } from "react";
import SearchBox from "../components/SearchBox";
import CoursesBox from "../components/CoursesBox";
import MyToggleButton from "../components/MyToggleButton";
import LocationPicker from 'react-location-picker';
import Geosuggest from 'react-geosuggest';
import { Button } from 'react-bootstrap';

const defaultPosition = {
  lat: 13.736717,
  lng: 100.523186
};

const google = window.google

export class TestCss extends Component {

  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e) => this.handleImageChange(e)} />
          <button className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
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
