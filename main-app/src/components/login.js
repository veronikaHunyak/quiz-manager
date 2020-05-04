import React, { Component } from "react";

export default class Login extends Component {
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
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  handleChange = (type) => (event) => {
    if (type === "user") {
      this.setState({ loginUser: event.target.value });
    }

    if (type === "pass") {
      this.setState({ loginPassword: event.target.value });
    }
  };

  render() {
    return (
      <div className="container">
        <form action="" onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="username">Username:</label>
            <input
              type="text"
              class="form-control"
              name="username"
              onChange={this.handleChange("user")}
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="form-control"
              name="password"
              onChange={this.handleChange("pass")}
            />
          </div>
          <button type="submit" class="btn btn-default">
            Login
          </button>
        </form>
      </div>
    );
  }
}
