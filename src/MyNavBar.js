import React, { Component } from "react";
import { Nav, Navbar, NavItem, NavbarBrand } from "react-bootstrap";

export class MyNavBar extends Component {
  render() {
    return (
      <div>
        <Navbar id="myNavBar" expand="lg" collapseOnSelect>
          <NavbarBrand id="navBrand" href="/">
            {" "}
            Trainer D
          </NavbarBrand>

          <Nav>
            <a className="NavLink" href="/">
              Home
            </a>
            <a className="NavLink" href="/searchCourses">
              Search Courses
            </a>
          </Nav>

          <Nav class="nav navbar-nav ml-auto">
            <a className="NavLink" href="/testCss">
              Register
            </a>
            <a className="NavLink" href="#login">
              Login
            </a>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default MyNavBar;
