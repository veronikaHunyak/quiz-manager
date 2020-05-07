import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Icon from "react-bootstrap-icons";

import { userTypes } from "../App";

class ViewQuizzes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: props.loggedInUserType === userTypes.edit,
    };
  }

  render() {
    return (
      <div>
        {!this.props.quizzes.length && this.state.editable && (
          <h6 className="container-fluid" style={{ margin: 10 }}>
            Oops! It looks like you have no quizzes. Press the button below to
            make some!
          </h6>
        )}
        {!this.props.quizzes.length && !this.state.editable && (
          <h6 className="container-fluid" style={{ margin: 10 }}>
            Oops! It looks like there are no quizzes! Come back later
          </h6>
        )}
        <a href="/add-quizzes">
          {this.state.editable && (
            <button
              className="btn btn-danger"
              type="button"
              style={{
                margin: "10px",
              }}
            >
              <Icon.PlusSquare style={{ marginRight: "10px" }} />
              Add a new quiz
            </button>
          )}
        </a>
        <br></br>
        <div className="container-fluid">
          <div className="list-group">
            {this.props.quizzes &&
              this.props.quizzes.map((quiz, index) => {
                return (
                  <a href={`/questions/${quiz._id}`} key={index}>
                    <button
                      type="button"
                      className="list-group-item list-group-item-action list-group-item-info"
                      style={{ margin: "5px" }}
                    >
                      {quiz.quizName}
                    </button>
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

ViewQuizzes.propTypes = {
  loggedInUserType: PropTypes.string.isRequired,
  quizzes: PropTypes.array.isRequired,
};

export default ViewQuizzes;
