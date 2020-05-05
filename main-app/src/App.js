import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./components/login";

export const userTypes = {
  edit: "Edit", //with username of user1
  view: "View", //with username of user2
  restricted: "Restricted", //with username of user3
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userType: localStorage.getItem("user"),
      loggedIn: false,
    };
  }

  componentDidMount() {
    if (this.state.userType) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ loggedIn: false });
    }
  }

  logOut = () => {
    this.setState({ loggedIn: false });
    localStorage.removeItem("user");
  };

  loginStateChange = (loginType) => {
    localStorage.setItem("user", loginType);
    this.setState({ loggedIn: true, userType: loginType });
  };

  renderlogin() {
    if (!this.state.loggedIn) {
      return (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      );
    } else {
      return (
        <Link to="/" className="nav-link" onClick={this.logOut}>
          Logout
        </Link>
      );
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "aliceblue" }}
          >
            <Link to="/quizes" className="navbar-brand">
              Quiz Manager
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/quizes" className="nav-link">
                    Quizes
                  </Link>
                </li>
                <li className="navbar-item">{this.renderlogin()}</li>
              </ul>
              {this.state.loggedIn && (
                <p>
                  Welcome back, your access rights are:{" "}
                  <b>{this.state.userType}</b>
                </p>
              )}
            </div>
          </nav>

          <Switch>
            <Route
              path="/login"
              exact
              render={(props) => (
                <Login {...props} loginStateChange={this.loginStateChange} />
              )}
            >
              {this.state.loggedIn ? (
                <Redirect to="/quizes" />
              ) : (
                <Login loginStateChange={this.loginStateChange} />
              )}
            </Route>

            {/* <Route
              path="/quizes"
              render={(props) => (
                <ViewQuizes
                  {...props}
                  loggedInUserType={this.state.userType}
                  quizes={this.state.quizes}
                />
              )}
            /> */}

            <Route path="/" exact>
              {this.state.loggedIn ? (
                <Redirect to="/quizes" />
              ) : (
                <Login loginStateChange={this.loginStateChange} />
              )}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
