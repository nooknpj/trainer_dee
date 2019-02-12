import React, { Component } from "react";
import { Form, Alert } from "react-bootstrap";
import "./css/navBar.css";
import {
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  Button,
  Modal
} from "react-bootstrap";

export class MyNavBar extends Component {
  constructor() {
    super();
    this.state = {
      showLogin: 0,
      showAuthenFailed: 0,
      email: "notAssigned",
      password: "notAssigned"
    };
  }
  onLoginClick = () => {
    this.setState({ showLogin: 1 });
  };

  // update email and password according to the email and password form
  onFormChange = e => {
    this.state[e.target.type] = e.target.value;
  };

  onSubmitLoginClick = () => {
    let userID = this.fetchLoginAuthen(this.state);
  };

  async fetchLoginAuthen(e) {
    try {
      console.log(JSON.stringify(e));
      const response = await fetch("/trainer_dee/login_authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(e)
      });

      let status = response.status;
      if (status == 400) {
        this.setState({
          showAuthenFailed: 1
        });
        return 0;
      }
      if (status == 200) {
        let results = await response.json();
        console.log("successful login");
        console.log(results);
        console.log(results[0].AuthenID);
        localStorage.setItem('userID',results[0].AuthenID);
        localStorage.setItem('isLoggedIn',1);
        this.handleClose();
        window.location.reload();
        return results;
      }
    } catch (error) {
      console.log("FetchLoginAuthen failed", error);
    }
  }

 

  handleClose = () => {
    this.setState({ showLogin: 0, showAuthenFailed: 0 });
  };

  onLogoutClick = () => {
    this.setState = {
      showLogin: 0,
      showAuthenFailed: 0,
      email: "notAssigned",
      password: "notAssigned"
    };
    localStorage.clear();
    localStorage.setItem("isLoggedIn", "0");
    
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
              <Nav className="nav navbar-nav ml-auto">
                <a className="navLink" href="/register">
                  Register
                </a>
                <a onClick={this.onLoginClick} className="navLink" href="javascript:void(0);">
                  Login
                </a>
              </Nav>
            ) : (
              <Nav className="nav navbar-nav ml-auto">
                <a className="navLink" href="/myAccount">
                  Account
                </a>
                <a onClick={this.onLogoutClick} className="navLink" href="javascript:void(0);">
                  Logout
                </a>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>

        {/* //loginPopUp */}
        <Modal show={this.state.showLogin} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={this.onFormChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.onFormChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Alert show={this.state.showAuthenFailed} variant="danger">
              Incorrect Email or Password. Please Try again.
            </Alert>
            <Button
              variant="primary"
              type="submit"
              onClick={this.onSubmitLoginClick}
            >
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

var isLoggedIn = localStorage.getItem("isLoggedIn");

export default MyNavBar;
