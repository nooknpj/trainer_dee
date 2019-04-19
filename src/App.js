import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import MyNavBar from "./MyNavBar";
import Footer from "./Footer";

import Home from "./pages/Home";
import SearchCourses from "./pages/SearchCourses";
import TestCss from "./pages/TestCss";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import ClientRegister from "./pages/ClientRegister";
import TrainerRegister from "./pages/TrainerRegister";
import TestSpace from "./pages/TestSpace";
import MyAccount from "./pages/MyAccount";
import AddCourse from "./pages/AddCourse";
import { EditProfile } from "./pages/EditProfile";
import { UpgradeTrainer } from "./pages/UpgradeTrainer";
import CourseDescription from "./pages/CourseDescription";
import ReserveSession from "./pages/ReserveSession";
import MyCourse from "./pages/MyCourse";
import { EditCourse } from "./pages/EditCourse";

class App extends Component {
  // when login is successful -> set IsLogin to 1
  // set value of key 'client' into localStorage --> .setItem(string,string)
  constructor() {
    super();
    // mockup courses from searchResults
    this.state = {
      currentPage: "/"
    };
  }

  componentDidMount() {
    // console.log(window.location.href);
    // console.log(window.location.pathname);
    this.setState({
      currentPage: window.location.pathname
    });
    if (localStorage.getItem("isLoggedIn") != 1) {
      localStorage.clear();
      localStorage.setItem("isLoggedIn", 0);
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <MyNavBar
            currentPage={this.state.currentPage}
            updateLogin={this.updateLogin}
            updateLogout={this.updateLogout}
          />

          <div className="Content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/searchCourses" component={SearchCourses} />
              <Route path="/testCss" component={TestCss} />
              <Route path="/register" component={Register} />
              <Route path="/clientRegister" component={ClientRegister} />
              <Route path="/trainerRegister" component={TrainerRegister} />
              <Route path="/testSpace" component={TestSpace} />
              <Route path="/myAccount" component={MyAccount} />
              <Route path="/addCourse" component={AddCourse} />
              <Route path="/editProfile" component={EditProfile} />
              <Route path="/upgrade" component={UpgradeTrainer} />
              <Route path={`/courseDesc/:courseID`} component={CourseDescription}/>
              <Route path="/myCourse" component={MyCourse}/>
              <Route path="/editCourse" component={EditCourse}/>
              <Route component={PageNotFound} />
            </Switch>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
