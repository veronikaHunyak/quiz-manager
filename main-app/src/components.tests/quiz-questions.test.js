import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ViewQuizQuestions from "../components/quiz-questions";
import { userTypes } from "../App";
import { mockQuiz } from "./test-helper";

describe("ViewQuizQuestions", () => {
  const props = {
    loggedInUserType: userTypes.edit,
    match: {
      params: {
        id: "1",
      },
    },
  };

  it("should render correctly", () => {
    const wrapper = shallow(<ViewQuizQuestions {...props} />);
    wrapper.setState({ quiz: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot of the user has view rights", () => {
    const wrapper = shallow(
      <ViewQuizQuestions {...props} loggedInUserType={userTypes.view} />
    );
    wrapper.setState({ quiz: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot of the user has restricted rights", () => {
    const wrapper = shallow(
      <ViewQuizQuestions {...props} loggedInUserType={userTypes.restricted} />
    );
    wrapper.setState({ quiz: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
