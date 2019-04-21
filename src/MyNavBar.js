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

  // //-------------show current page -----------------------------------------------------------------

  getIsHome = () => {
    if (this.props.currentPage != "/") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsSearchCourses = () => {
    if (this.props.currentPage != "/searchCourses") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsAddCourse = () => {
    if (this.props.currentPage != "/addCourse") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsMyCourse = () => {
    if (this.props.currentPage != "/myCourse") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsReserveSession = () => {
    if (this.props.currentPage != "/reserveSession") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsMyAccount = () => {
    if (
      !(
        this.props.currentPage == "/myAccount" ||
        this.props.currentPage == "/editProfile" ||
        this.props.currentPage == "/upgrade"
      )
    )
      return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  getIsRegister = () => {
    if (this.props.currentPage != "/register") return;
    let currentPageStyle = {
      backgroundColor: "white",
      color: "black",
      borderRadius: "10px"
    };
    return currentPageStyle;
  };

  //-------------show current page -----------------------------------------------------------------
  onLoginClick = () => {
    this.setState({ showLogin: 1 });
  };

  // update email and password according to the email and password form
  onFormChange = e => {
    this.state[e.target.type] = e.target.value;
  };

  handleKeyPress = (target) => {
    if (target.charCode == 13) {
      this.onSubmitLoginClick();
    }
  }

  onSubmitLoginClick = () => {
    let clientID = this.fetchLoginAuthen(this.state);
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
        console.log(results[0].clientID);
        console.log(results[0].fName);
        console.log(results[0].isTrainer);
        localStorage.setItem("clientID", results[0].clientID);
        localStorage.setItem("fName", results[0].fName);
        localStorage.setItem("isTrainer", results[0].isTrainer);
        localStorage.setItem("isLoggedIn", 1);
        this.handleClose();
        console.log(localStorage.getItem("clientID"));
        console.log(localStorage.getItem("fName"));
        console.log(localStorage.getItem("isLoggedIn"));
        console.log(localStorage.getItem("isTrainer"));
        window.location = "/";

        // window.location.reload();
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
    localStorage.setItem("isTrainer", "0");
    localStorage.setItem("clientID", "0");
    localStorage.setItem("fName", "unassigned");

    window.location = "/";
  };

  getAccountType = () => {
    if (localStorage.getItem("isTrainer") == 0) {
      return "Client   ";
    } else if (localStorage.getItem("isTrainer") == 1) {
      return "Trainer  ";
    } else return "";
  };

  render() {
    return (
      <div>
        <Navbar id="myNavBar" expand="xl" collapseOnSelect>
          <NavbarBrand id="navBrand" href="/">
            {" "}
            Trainer D
          </NavbarBrand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <a className="navLink" href="/" style={this.getIsHome()}>
                Home
              </a>
              <a
                className="navLink"
                href="/searchCourses"
                style={this.getIsSearchCourses()}
              >
                Search Courses
              </a>

              {localStorage.getItem("isLoggedIn") == 1 &&
                localStorage.getItem("isTrainer") == 1 ? (
                  <a
                    className="navLink"
                    href="/addCourse"
                    style={this.getIsAddCourse()}
                  >
                    Add Course
                </a>
                ) : (
                  <div />
                )}
            </Nav>

            {localStorage.getItem("isLoggedIn") == 0 ? (
              <Nav className="nav navbar-nav ml-auto">
                <a
                  className="navLink"
                  href="/register"
                  style={this.getIsRegister()}
                >
                  Register
                </a>

                <a
                  onClick={this.onLoginClick}
                  className="navLink"
                  href="javascript:void(0);"
                >
                  Login
                </a>
              </Nav>
            ) : (
                <Nav className="nav navbar-nav ml-auto">
                  {localStorage.getItem("isLoggedIn") == 1 ? (
                    <a className="navLink" href="/myCourse" style={this.getIsMyCourse()}>
                      My Course
                  </a>

                  ) : (
                      <div />
                    )}

                  <a
                    className="navLink"
                    href="/myAccount"
                    style={this.getIsMyAccount()}
                  >
                    {this.getAccountType()}
                    {localStorage.getItem("fName")}
                  </a>
                  <a
                    onClick={this.onLogoutClick}
                    className="navLink"
                    href="javascript:void(0);"
                  >
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
                onKeyPress={this.handleKeyPress}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.onFormChange}
                onKeyPress={this.handleKeyPress}
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
