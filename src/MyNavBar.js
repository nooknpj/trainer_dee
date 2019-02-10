import React, { Component } from "react";
import "./css/navBar.css";
import { Nav, Navbar, NavItem, NavbarBrand } from "react-bootstrap";

export class MyNavBar extends Component {
  onLoginClick = () => {
    let mockUpClient = {
      fName: "John",
      clientID: "1234"
    };
    this.props.updateLogin(mockUpClient);
  };

  onLogoutClick = () => {
    this.props.updateLogout();
    window.location = "/";
  };

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

            {localStorage.getItem("isLoggedIn") == 0 ? (
              <Nav class="nav navbar-nav ml-auto">
                <a className="navLink" href="/register">
                  Register
                </a>
                <a onClick={this.onLoginClick} className="navLink" href="#">
                  Login
                </a>
              </Nav>
            ) : (
              <Nav class="nav navbar-nav ml-auto">
                <a className="navLink" href="#">
                  {localStorage.getItem("fName")}
                </a>
                <a onClick={this.onLogoutClick} className="navLink" href="#">
                  Logout
                </a>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

var isLoggedIn = localStorage.getItem("isLoggedIn");

export default MyNavBar;
