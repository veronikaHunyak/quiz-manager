import React, { Component } from "react";
import PropTypes from "prop-types";

class NewAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizes: props.quiz,
    };
  }

  handleChange = (type, questionIndex, optionsIndex) => (event) => {
    let newState = this.state.quizes;

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
        {this.state.quizes.quizData[questionIndex].options.map(
          (option, index) => {
            return (
              <div
                class="row"
                style={{ margin: "10px" }}
                key={`answer${index}`}
              >
                <div class="col-2">
                  <label for="option">{Object.keys(option)}:</label>
                </div>
                <div class="col-10">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter an answer option"
                    id={`option${index}`}
                    onChange={this.handleChange("option", questionIndex, index)}
                  />
                </div>
              </div>
            );
          }
        )}
        <div class="row" style={{ margin: "10px" }}>
          <div class="col-2">
            <label for="option">Answer:</label>
          </div>
          <div class="col-10">
            <div class="btn-group btn-group-toggle">
              {this.state.quizes.quizData[questionIndex].options.map(
                (option, index) => {
                  const active =
                    this.state.quizes.quizData[questionIndex].answer ===
                      Object.keys(option)[0] && "active";
                  return (
                    <label class={`btn btn-secondary ${active}`} key={index}>
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
