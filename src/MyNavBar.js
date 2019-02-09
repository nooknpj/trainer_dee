import React, { Component } from "react";
import "./css/navBar.css";
import { Nav, Navbar, NavItem, NavbarBrand } from "react-bootstrap";

export class MyNavBar extends Component {
  render() {
    return (
      <div>
        <Navbar id="myNavBar" expand="md" collapseOnSelect>
          <NavbarBrand id="navBrand" href="/">
            {" "}
            Trainer D
          </NavbarBrand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <a className="navLink" href="/">
                Home
              </a>
              <a className="navLink" href="/searchCourses">
                Search Courses
              </a>
            </Nav>

            <Nav class="nav navbar-nav ml-auto">
              <a className="navLink" href="/testCss">
                Register
              </a>
              <a className="navLink" href="#login">
                Login
              </a>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavBar;
