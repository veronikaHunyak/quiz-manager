import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";

import NewQuestion from "./add-new-question";

export default class AddQuizes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addQuiz: false,
      quizes: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const body = JSON.stringify(this.state.quizes);
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
          window.location.replace("/quizes");
        } else {
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  handleChange = (quizIndex) => (event) => {
    let newState = this.state.quizes[quizIndex];

    newState.quizName = event.target.value;
    this.setState({ newState });
  };

  handleQuestionClick = (quizIndex) => (event) => {
    event.preventDefault();

    //thorough guarding against
    if (this.state.quizes[quizIndex]) {
      if (this.state.quizes[quizIndex].quizData) {
        let question =
          "question" + this.state.quizes[quizIndex].quizData.length;

        let newQuestion = this.state.quizes[quizIndex];
        newQuestion.quizData.push({ question });

        this.setState({ newQuestion });
      } else {
        let addQuestions = {
          ...this.state.quizes[quizIndex],
          quizData: [{ question: "question0" }],
        };
        let newQuestion = this.state.quizes;
        newQuestion[quizIndex] = addQuestions;
        this.setState({ newQuestion });
      }
    }
  };

  handleQuizClick = (event) => {
    event.preventDefault();

    let quiz = "quiz" + this.state.quizes.length;

    let newQuiz = this.state.quizes;
    newQuiz.push({ quizKey: quiz });

    this.setState({ quizes: newQuiz });
  };

  renderNewQuiz = () => {
    return this.state.quizes.map((quiz, index) => {
      return (
        <div
          className="container-fluid card"
          style={{ backgroundColor: "seashell", marginBottom: "35px" }}
        >
          <form action="">
            <div class="form-group" style={{ padding: "10px" }}>
              <div class="row">
                <div class="col-2">
                  <label for="email">Quiz name:</label>
                </div>
                <div class="col-8">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter quiz name"
                    id={`quiz${index}`}
                    onChange={this.handleChange(index)}
                  />
                </div>
                <div class="col-2">
                  <button
                    class="btn btn-outline-danger"
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
              {this.state.quizes[index].quizData && (
                <NewQuestion quiz={this.state.quizes[index]} />
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
        <h6 className="container-fluid">
          Hello person, here you can create new quizes
        </h6>
        <a href="/quizes">
          <button
            class="btn btn-primary"
            type="button"
            style={{ margin: "10px" }}
          >
            <Icon.ChevronBarLeft style={{ marginRight: "10px" }} />
            View quizes
          </button>
        </a>
        <button
          class="btn btn-primary"
          type="button"
          onClick={this.handleQuizClick}
          style={{ margin: "10px" }}
        >
          <Icon.PlusSquare style={{ marginRight: "10px" }} />
          Add a new Quiz
        </button>
        <br></br>
        {this.state.quizes.length > 0 && this.renderNewQuiz()}
        {this.state.quizes.length > 0 && (
          <button
            class="btn btn-danger"
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
