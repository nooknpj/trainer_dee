import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import TestCss from "./pages/TestCss";
import PageNotFound from "./pages/PageNotFound";
import MyNavBar from "./MyNavBar";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MyNavBar />

          <div className="Content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/courses" component={Courses} />
              <Route path="/testCss" component={TestCss} />
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
