import React, { Component } from "react";
import * as Icon from "react-bootstrap-icons";

import NewAnswer from "./add-new-answer";

export default class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.quiz = props.newQuestion ? props.newQuestion : props.quiz;
    this.state = {
      addQuiz: false,
      quizes: this.quiz,
    };
  }

  handleChange = (questionIndex) => (event) => {
    let newState = this.state.quizes;

    newState = newState.quizData[questionIndex];

    newState.question = event.target.value;
    this.setState({ newState });
  };

  handleAnswerClick = (questionIndex) => (event) => {
    event.preventDefault();
    if (
      //thorough guarding against
      this.state.quizes &&
      this.state.quizes.quizData &&
      this.state.quizes.quizData[questionIndex]
    ) {
      let newOptions = this.state.quizes;
      if (!this.state.quizes.quizData[questionIndex].options) {
        let addOptions = {
          ...this.state.quizes.quizData[questionIndex],
          options: [{ A: "" }, { B: "" }, { C: "" }],
        };
        newOptions = this.state.quizes;
        newOptions.quizData[questionIndex] = addOptions;
        this.setState({ newOptions });
      } else if (
        this.state.quizes.quizData[questionIndex].options.length === 3
      ) {
        newOptions.quizData[questionIndex].options.push({ D: "" });
        this.setState({ newOptions });
      } else if (
        this.state.quizes.quizData[questionIndex].options.length === 4
      ) {
        newOptions.quizData[questionIndex].options.push({ E: "" });
        this.setState({ newOptions });
      }
    }
  };

  renderContainer = () => {
    return this.state.quizes.quizData.map((question, index) => {
      return (
        <div style={{ margin: "35px" }} key={index}>
          <div class="row" style={{ margin: "10px" }}>
            <div class="col-2">
              <label for="email">Question {index + 1}:</label>
            </div>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                placeholder="Enter question"
                id={`question${index}`}
                onChange={this.handleChange(index)}
              />
            </div>
            <div class="col-2">
              <button
                class="btn btn-outline-danger"
                type="button"
                onClick={this.handleAnswerClick(index)}
                style={{ backgroundColor: "lavenderblush" }}
              >
                <Icon.PlusSquare style={{ marginRight: "10px" }} />
                Add answers
              </button>
            </div>
          </div>
          {this.state.quizes.quizData[index].options && (
            <NewAnswer quiz={this.state.quizes} questionIndex={index} />
          )}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div>{this.renderContainer()}</div>
        {this.props.onQuizUpdated && (
          <div>
            <button
              class="btn btn-danger"
              type="button"
              onClick={() => this.props.onQuizUpdated(this.state.quizes)}
              style={{ margin: "10px", float: "right" }}
            >
              <Icon.Check style={{ marginRight: "10px" }} />
              Add Question(s)
            </button>
          </div>
        )}
      </div>
    );
  }
}
