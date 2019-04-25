import React, { Component } from "react";
import pageNotFoundImg from "../img/pageNotFoundImg.jpg";
export class PageNotFound extends Component {
  render() {
    return (
      <div>
        <img src={pageNotFoundImg} width="100%" />
      </div>
    );
  }
}

export default PageNotFound;
