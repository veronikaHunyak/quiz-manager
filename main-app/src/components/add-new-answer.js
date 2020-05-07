import React, { Component } from "react";
import PropTypes from "prop-types";

class NewAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: props.quiz,
    };
  }

  handleChange = (type, questionIndex, optionsIndex) => (event) => {
    let newState = this.state.quizzes;

    switch (type) {
      case "option":
        newState = newState.quizData[questionIndex].options[optionsIndex];
        let newObj = Object.keys(newState);
        newState[newObj] = event.target.value;
        this.setState({ newState });
        break;
      case "answer":
        newState = newState.quizData[questionIndex];
        newState.answer = event.target.value;
        this.setState({ newState });
        break;
      default:
        return;
    }
  };

  render() {
    const { questionIndex } = this.props;
    return (
      <div>
        {this.state.quizzes.quizData[questionIndex].options.map(
          (option, index) => {
            return (
              <div
                className="row"
                style={{ margin: "10px" }}
                key={`answer${index}`}
              >
                <div className="col-2">
                  <label for="option">{Object.keys(option)}:</label>
                </div>
                <div className="col-10">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter an answer option"
                    id={`option${index}`}
                    onChange={this.handleChange("option", questionIndex, index)}
                  />
                </div>
              </div>
            );
          }
        )}
        <div className="row" style={{ margin: "10px" }}>
          <div className="col-2">
            <label for="option">Answer:</label>
          </div>
          <div className="col-10">
            <div className="btn-group btn-group-toggle">
              {this.state.quizzes.quizData[questionIndex].options.map(
                (option, index) => {
                  const active =
                    this.state.quizzes.quizData[questionIndex].answer ===
                      Object.keys(option)[0] && "active";
                  return (
                    <label
                      className={`btn btn-secondary ${active}`}
                      key={index}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="options"
                        autoComplete="off"
                        value={Object.keys(option)}
                        onChange={this.handleChange(
                          "answer",
                          questionIndex,
                          index
                        )}
                      />
                      {Object.keys(option)}
                    </label>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewAnswer.propTypes = {
  questionIndex: PropTypes.number,
  quiz: PropTypes.object,
};

export default NewAnswer;
