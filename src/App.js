import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SearchCourses from "./pages/SearchCourses";
import TestCss from "./pages/TestCss";
import PageNotFound from "./pages/PageNotFound";
import MyNavBar from "./MyNavBar";
import Footer from "./Footer";
import ClientRegister from "./pages/ClientRegister";
import TestSpace from "./pages/TestSpace";

class App extends Component {
  // when login is successful -> set IsLogin to 1
  // set value of key 'client' into localStorage --> .setItem(string,string)

  componentDidMount() {
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
            updateLogin={this.updateLogin}
            updateLogout={this.updateLogout}
          />

          <div className="Content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/searchCourses" component={SearchCourses} />
              <Route path="/testCss" component={TestCss} />
              <Route path="/register" component={ClientRegister} />
              <Route path="/testSpace" component={TestSpace} />
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
