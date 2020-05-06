import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Icon from "react-bootstrap-icons";

import { userTypes } from "../App";

class ViewQuizes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editable: props.loggedInUserType === userTypes.edit,
    };
  }

  render() {
    return (
      <div>
        <a href="/add-quizes">
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
            {this.props.quizes &&
              this.props.quizes.map((quiz, index) => {
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

ViewQuizes.propTypes = {
  loggedInUserType: PropTypes.string.isRequired,
  quizes: PropTypes.array.isRequired,
};

export default ViewQuizes;
