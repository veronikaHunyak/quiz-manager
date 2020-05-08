import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import Login from "./components/login";
import ViewQuizzes from "./components/quizzes";
import ViewQuizQuestions from "./components/quiz-questions";
import AddQuizzes from "./components/add-quizzes";

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
      quizzes: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:4000/quizzes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ quizzes: result });
      })
      .catch((err) => {
        console.log("quizzes not available", err);
      });

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
    localStorage.setItem("user", loginType); //store user session
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
            <Link
              to={this.state.loggedIn && "/quizzes"}
              className="navbar-brand"
            >
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
                  <Link
                    to={this.state.loggedIn && "/quizzes"}
                    className="nav-link"
                  >
                    Quizzes
                  </Link>
                </li>
                <li className="navbar-item">{this.renderlogin()}</li>
              </ul>
              {this.state.loggedIn && (
                <p>
                  Welcome back, your access right is:{" "}
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
                <Redirect to="/quizzes" />
              ) : (
                <Login loginStateChange={this.loginStateChange} />
              )}
            </Route>

            <Route
              path="/quizzes"
              render={(props) => (
                <ViewQuizzes
                  {...props}
                  loggedInUserType={this.state.userType}
                  quizzes={this.state.quizzes}
                />
              )}
            />

            <Route
              path="/questions/:id"
              render={(props) => (
                <ViewQuizQuestions
                  {...props}
                  loggedInUserType={this.state.userType}
                />
              )}
            />

            <Route
              path="/add-quizzes"
              render={(props) => (
                <AddQuizzes {...props} loggedInUserType={this.state.userType} />
              )}
            />

            <Route path="/" exact>
              {this.state.loggedIn ? (
                <Redirect to="/quizzes" />
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
