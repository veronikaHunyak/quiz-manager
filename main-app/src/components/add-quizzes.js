import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";

import NewQuestion from "./add-new-question";

export default class AddQuizzes extends Component {
  state = {
    quizzes: [],
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const body = JSON.stringify(this.state.quizzes);
    fetch("http://localhost:4000/add", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.statusCode === 200) {
          alert("YAY");
          window.location.replace("/quizzes");
        } else {
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  handleChange = (quizIndex) => (event) => {
    let newState = this.state.quizzes[quizIndex];

    newState.quizName = event.target.value;
    this.setState({ newState });
  };

  handleQuestionClick = (quizIndex) => (event) => {
    event.preventDefault();

    //thorough guarding against
    if (this.state.quizzes[quizIndex]) {
      if (this.state.quizzes[quizIndex].quizData) {
        let question =
          "question" + this.state.quizzes[quizIndex].quizData.length;

        let newQuestion = this.state.quizzes[quizIndex];
        newQuestion.quizData.push({ question });

        this.setState({ newQuestion });
      } else {
        let addQuestions = {
          ...this.state.quizzes[quizIndex],
          quizData: [{ question: "question0" }],
        };
        let newQuestion = this.state.quizzes;
        newQuestion[quizIndex] = addQuestions;
        this.setState({ newQuestion });
      }
    }
  };

  handleQuizClick = (event) => {
    event.preventDefault();

    let quiz = "quiz" + this.state.quizzes.length;

    let newQuiz = this.state.quizzes;
    newQuiz.push({ quizKey: quiz });

    this.setState({ quizzes: newQuiz });
  };

  renderNewQuiz = () => {
    return this.state.quizzes.map((quiz, index) => {
      return (
        <div
          className="container-fluid card"
          style={{ backgroundColor: "seashell", marginBottom: "35px" }}
        >
          <form action="">
            <div className="form-group" style={{ padding: "10px" }}>
              <div className="row">
                <div className="col-2">
                  <label for="email">Quiz name:</label>
                </div>
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter quiz name"
                    id={`quiz${index}`}
                    onChange={this.handleChange(index)}
                  />
                </div>
                <div className="col-2">
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={this.handleQuestionClick(index)}
                    style={{ backgroundColor: "lavenderblush" }}
                  >
                    <Icon.PlusSquare style={{ marginRight: "10px" }} />
                    Add a question
                  </button>
                </div>
              </div>
              <br></br>
              {this.state.quizzes[index].quizData && (
                <NewQuestion quiz={this.state.quizzes[index]} />
              )}
            </div>
          </form>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <h6 className="container-fluid" style={{ margin: 10 }}>
          Hello, here you can create new quizzes
        </h6>
        <a href="/quizzes">
          <button
            className="btn btn-primary"
            type="button"
            style={{ margin: "10px" }}
          >
            <Icon.ChevronBarLeft style={{ marginRight: "10px" }} />
            View quizzes
          </button>
        </a>
        <button
          className="btn btn-primary"
          type="button"
          onClick={this.handleQuizClick}
          style={{ margin: "10px" }}
        >
          <Icon.PlusSquare style={{ marginRight: "10px" }} />
          Add a new Quiz
        </button>
        <br></br>
        {this.state.quizzes.length > 0 && this.renderNewQuiz()}
        {this.state.quizzes.length > 0 && (
          <button
            className="btn btn-danger"
            type="button"
            onClick={this.handleSubmit}
            style={{ margin: "10px" }}
          >
            <Icon.CheckBox style={{ marginRight: "10px" }} />
            Save and Submit
          </button>
        )}
      </div>
    );
  }
}
