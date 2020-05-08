import React, { Component } from "react";
import PropTypes from "prop-types";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUser: "",
      loginPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      username: this.state.loginUser,
      password: this.state.loginPassword,
    });
    fetch("http://localhost:4000/signin", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          this.props.loginStateChange(result.user.usertype);
        } else {
          alert("Incorrect login details!");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  handleChange = (event) => {
    if (event.target.id === "username") {
      this.setState({ loginUser: event.target.value });
    }

    if (event.target.id === "password") {
      this.setState({ loginPassword: event.target.value });
    }
  };

  render() {
    return (
      <div className="container">
        <form action="" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Login
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginStateChange: PropTypes.func.isRequired,
};

export default Login;
