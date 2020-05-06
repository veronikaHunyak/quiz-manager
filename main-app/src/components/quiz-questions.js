import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Icon from "react-bootstrap-icons";

import { userTypes } from "../App";
import NewQuestion from "./add-new-question";

const fieldTypes = {
  quizName: "Quiz Name",
  question: "Question",
  option: "Option",
};

class ViewQuizQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quiz: {},
      inEditing: false,
      keyInEditing: "",
      editable: props.loggedInUserType === userTypes.edit,
      viewAnswers: props.loggedInUserType !== userTypes.restricted,
      newQuestions: { quizData: [] },
    };
  }

  componentDidMount() {
    fetch(`http://localhost:4000/questions/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ quiz: result });
      });
  }

  save(type, event, questionIndex, answerIndex) {
    switch (type) {
      case "quizName":
        let newQuiz = this.state.quiz;
        newQuiz.quizName = event.target.value;
        this.setState({ newQuiz, inEditing: false });
        break;

      case "question":
        let newQuestion = this.state.quiz.quizData[questionIndex];
        newQuestion.question = event.target.value;
        this.setState({ newQuestion, inEditing: false });
        break;

      case "option":
        let newOption = this.state.quiz.quizData[questionIndex].options[
          answerIndex
        ];
        const optionKey = Object.keys(newOption);
        newOption[optionKey] = event.target.value;
        this.setState({ newOption, inEditing: false });
        break;

      case "answer":
        let newAns = this.state.quiz.quizData[questionIndex];
        newAns.answer = event.target.value;
        this.setState({ newAns, inEditing: false });
        break;

      default:
        return;
    }
  }

  sendAndSave = async (event) => {
    event.preventDefault();
    const body = JSON.stringify(this.state.quiz);
    fetch(`http://localhost:4000/update`, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          window.location.replace("/quizes");
        } else {
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  textField(type, questionIndex, answerIndex) {
    if (this.state.inEditing) {
      return (
        <div>
          <input
            type="text"
            class="form-control"
            placeholder={fieldTypes[type]}
            id={answerIndex}
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                switch (type) {
                  case "quizName":
                    this.save(type, event);
                    break;
                  case "question":
                    this.save(type, event, questionIndex);
                    break;
                  case "option":
                    this.save(type, event, questionIndex, answerIndex);
                    break;
                  default:
                    return;
                }
              }
            }}
          />
        </div>
      );
    }
  }

  handleChange(type, questionIndex, answerIndex) {
    switch (type) {
      case "quizName":
        this.setState({
          inEditing: true,
          keyInEditing: ``,
        });
        break;
      case "question":
        this.setState({
          inEditing: true,
          keyInEditing: `${questionIndex}`,
        });
        break;
      case "option":
        this.setState({
          inEditing: true,
          keyInEditing: `${questionIndex}${answerIndex}`,
        });
        break;
      default:
        return;
    }
  }

  renderAnswer(question, questionIndex) {
    return (
      <div className="row" style={{ margin: "10px" }}>
        <div className="col-2">
          <label>Answer:</label>
        </div>
        <div className="col-10">
          <div className="btn-group btn-group-toggle">
            {question.options.map((option, index) => {
              const active =
                question.answer === Object.keys(option)[0] && "active";

              return (
                <label className={`btn btn-secondary ${active}`}>
                  <input
                    type="radio"
                    autoComplete="off"
                    value={Object.keys(option)}
                    onChange={(event) =>
                      this.state.editable &&
                      this.save("answer", event, questionIndex)
                    }
                  />
                  {Object.keys(option)}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  renderNewAnswer(questionIndex) {
    let newOptions = this.state.quiz;
    if (this.state.quiz.quizData[questionIndex].options.length === 3) {
      newOptions.quizData[questionIndex].options.push({ D: "" });
      this.setState({
        newOptions,
        inEditing: true,
        keyInEditing: `${questionIndex}${3}`,
      });
    } else if (this.state.quiz.quizData[questionIndex].options.length === 4) {
      newOptions.quizData[questionIndex].options.push({ E: "" });
      this.setState({
        newOptions,
        inEditing: true,
        keyInEditing: `${questionIndex}${4}`,
      });
    }
  }

  renderOptions(question, questionIndex) {
    return (
      <ul className="list-group">
        {question.options.map((answer, index) => {
          const ansVal = Object.keys(answer);
          if (
            this.state.inEditing === true &&
            this.state.keyInEditing === `${questionIndex}${index}` &&
            this.state.editable
          ) {
            return (
              <li className="list-group-item" key={index}>
                <label>
                  <b>{Object.keys(answer)}</b>
                </label>
                {this.textField("option", questionIndex, index)}
              </li>
            );
          } else {
            return (
              <li className="list-group-item" key={index}>
                <b>{Object.keys(answer)}</b> {answer[ansVal]}
                <div style={{ float: "right" }}>
                  <Icon.Pencil
                    color={this.state.editable ? "crimson" : "darkgrey"}
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.handleChange("option", questionIndex, index)
                    }
                  />
                  <Icon.Trash
                    color={this.state.editable ? "crimson" : "darkgrey"}
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.state.editable &&
                      this.delete("option", questionIndex, index)
                    }
                  />
                </div>
              </li>
            );
          }
        })}
      </ul>
    );
  }

  renderQuestion() {
    return this.state.quiz.quizData.map((question, index) => {
      if (
        this.state.inEditing === true &&
        this.state.keyInEditing === `${index}` &&
        this.state.editable
      ) {
        return (
          <li className="list-group-item" key={index}>
            {this.textField("question", index)}
          </li>
        );
      } else {
        return (
          <div className="card" key={`question_${index}`}>
            <div
              className="card-header"
              id={`heading${index}`}
              style={{ backgroundColor: "aliceblue" }}
            >
              <h2 className="mb-0">
                <button
                  className="btn"
                  type="button"
                  data-toggle="collapse"
                  data-target={`#collapse${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse${index}`}
                >
                  {question.question}
                </button>
                <div style={{ float: "right" }}>
                  <Icon.Pencil
                    color={this.state.editable ? "crimson" : "darkgrey"}
                    style={{ margin: "5px" }}
                    onClick={() => this.handleChange("question", index)}
                  />
                  <Icon.Trash
                    color={this.state.editable ? "crimson" : "darkgrey"}
                    style={{ margin: "5px" }}
                    onClick={() =>
                      this.state.editable && this.delete("question", index)
                    }
                  />
                </div>
              </h2>
            </div>
            {this.state.viewAnswers && (
              <div
                id={`collapse${index}`}
                className="collapse"
                aria-labelledby={`heading${index}`}
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  {this.renderOptions(question, index)}
                  {this.renderAnswer(question, index)}
                  {this.state.editable && (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => this.renderNewAnswer(index)}
                      style={{ margin: "10px", float: "right" }}
                    >
                      <Icon.PlusSquare style={{ marginRight: "10px" }} />
                      Add a new Answer
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      }
    });
  }

  renderNewQuestion = () => {
    let question = " ";

    let newQuestion = this.state.newQuestions;
    newQuestion.quizData.push({ question });

    this.setState({ newQuestion });
  };

  renderQuizTitle() {
    if (
      this.state.inEditing === true &&
      this.state.keyInEditing === "" &&
      this.state.editable
    ) {
      return (
        <div className="card" style={{ marginBottom: "10px" }}>
          <div className="card-header list-group-item-info">
            <h2 className="mb-0">{this.textField("quizName")}</h2>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card" style={{ marginBottom: "10px" }}>
          <div className="card-header list-group-item-info">
            <h2 className="mb-0">
              <button className="btn" type="button">
                <b>{this.state.quiz.quizName}</b>
              </button>
              <div style={{ float: "right" }}>
                <Icon.Pencil
                  color={this.state.editable ? "crimson" : "darkgrey"}
                  onClick={() => this.handleChange("quizName")}
                />
              </div>
            </h2>
          </div>
        </div>
      );
    }
  }

  onQuizUpdated = (newQuiz) => {
    let incomingQuestions = this.state.quiz;

    newQuiz.quizData.forEach((element) => {
      incomingQuestions.quizData.push(element);
    });

    this.setState({ incomingQuestions, newQuestions: { quizData: [] } });
  };

  delete = (type, questionIndex, answerIndex) => {
    let body = JSON.stringify(this.state.quiz);
    let url;
    switch (type) {
      case "quiz":
        url = `http://localhost:4000/delete/${this.state.quiz._id}`;
        break;
      case "question":
        url = `http://localhost:4000/delete/${this.state.quiz._id}/${questionIndex}`;
        break;
      case "option":
        url = `http://localhost:4000/delete/${this.state.quiz._id}/${questionIndex}/${answerIndex}`;
        break;
      default:
        return;
    }

    fetch(url, {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          alert("delete successful :)");
          window.location.replace("/quizes");
        } else {
          console.log("bad :(");
        }
      })
      .catch((err) => console.log("we went wrong", err));
  };

  render() {
    return (
      <div>
        <a href="/quizes">
          <button
            className="btn btn-primary"
            type="button"
            style={{ margin: "10px" }}
          >
            <Icon.ChevronBarLeft style={{ marginRight: "10px" }} />
            View quizes
          </button>
        </a>

        {this.state.editable && (
          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.renderNewQuestion}
              style={{ margin: "10px" }}
            >
              <Icon.PlusSquare style={{ marginRight: "10px" }} />
              Add a new Question to current quiz
            </button>
            <a href="/add-quizes">
              <button
                className="btn btn-danger"
                type="button"
                style={{
                  margin: "10px",
                  float: "right",
                }}
              >
                <Icon.PlusSquare style={{ marginRight: "10px" }} />
                Add a new quiz
              </button>
            </a>
          </div>
        )}
        <br></br>
        <div className="container-fluid">
          <div>{this.state.quiz.quizData && this.renderQuizTitle()}</div>
          <div>{this.state.quiz.quizData && this.renderQuestion()}</div>
          <div>
            {this.state.quiz.quizData &&
              this.state.newQuestions.quizData.length > 0 && (
                <div className="container-fluid">
                  <NewQuestion
                    quiz={this.state.quiz}
                    newQuestion={this.state.newQuestions}
                    onQuizUpdated={this.onQuizUpdated}
                  />
                </div>
              )}
          </div>
        </div>
        <br></br>
        {this.state.editable && (
          <div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.sendAndSave}
              style={{ margin: "10px" }}
            >
              <Icon.Check style={{ marginRight: "10px" }} />
              Save and Submit
            </button>
            <a href="/quizes">
              <button
                className="btn btn-danger"
                type="button"
                style={{ margin: "10px" }}
              >
                <Icon.XCircle style={{ marginRight: "10px" }} />
                Cancel edit
              </button>
            </a>

            <button
              className="btn btn-danger"
              type="button"
              onClick={() => this.delete("quiz", this.state.quiz._id)}
              style={{ margin: "10px", float: "right" }}
            >
              <Icon.Trash style={{ marginRight: "10px" }} />
              Delete quiz
            </button>
          </div>
        )}
      </div>
    );
  }
}

ViewQuizQuestions.propTypes = {
  loggedInUserType: PropTypes.string.isRequired,
};

export default ViewQuizQuestions;
