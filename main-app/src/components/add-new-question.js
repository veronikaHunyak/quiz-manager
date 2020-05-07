import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Icon from "react-bootstrap-icons";

import NewAnswer from "./add-new-answer";

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.quiz = props.newQuestion || props.quiz;
    this.state = {
      quizzes: this.quiz,
    };
  }

  handleChange = (questionIndex) => (event) => {
    let newState = this.state.quizzes;

    newState = newState.quizData[questionIndex];

    newState.question = event.target.value;
    this.setState({ newState });
  };

  handleAnswerClick = (questionIndex) => (event) => {
    event.preventDefault();
    if (
      //thorough guarding against
      this.state.quizzes &&
      this.state.quizzes.quizData &&
      this.state.quizzes.quizData[questionIndex]
    ) {
      let newOptions = this.state.quizzes;
      if (!this.state.quizzes.quizData[questionIndex].options) {
        let addOptions = {
          ...this.state.quizzes.quizData[questionIndex],
          options: [{ A: "" }, { B: "" }, { C: "" }],
        };
        newOptions = this.state.quizzes;
        newOptions.quizData[questionIndex] = addOptions;
        this.setState({ newOptions });
      } else if (
        this.state.quizzes.quizData[questionIndex].options.length === 3
      ) {
        newOptions.quizData[questionIndex].options.push({ D: "" });
        this.setState({ newOptions });
      } else if (
        this.state.quizzes.quizData[questionIndex].options.length === 4
      ) {
        newOptions.quizData[questionIndex].options.push({ E: "" });
        this.setState({ newOptions });
      }
    }
  };

  renderContainer = () => {
    return this.state.quizzes.quizData.map((question, index) => {
      return (
        <div style={{ margin: "35px" }} key={index}>
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-2">
              <label for="email">Question {index + 1}:</label>
            </div>
            <div className="col-8">
              <input
                type="text"
                className="form-control"
                placeholder="Enter question"
                id={`question${index}`}
                onChange={this.handleChange(index)}
              />
            </div>
            <div className="col-2">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={this.handleAnswerClick(index)}
                style={{ backgroundColor: "lavenderblush" }}
              >
                <Icon.PlusSquare style={{ marginRight: "10px" }} />
                Add answers
              </button>
            </div>
          </div>
          {this.state.quizzes.quizData[index].options && (
            <NewAnswer quiz={this.state.quizzes} questionIndex={index} />
          )}
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.quizzes.quizData && this.renderContainer()}</div>
        {this.props.onQuizUpdated && (
          <div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => this.props.onQuizUpdated(this.state.quizzes)}
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
NewQuestion.propTypes = {
  newQuestion: PropTypes.bool,
  quiz: PropTypes.object.isRequired,
  onQuizUpdated: PropTypes.func,
};

export default NewQuestion;
