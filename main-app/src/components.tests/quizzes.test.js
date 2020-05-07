import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ViewQuizzes from "../components/quizzes";
import { userTypes } from "../App";
import { mockQuiz } from "./test-helper";

describe("ViewQuizzes", () => {
  const props = {
    loggedInUserType: userTypes.edit,
    quizzes: mockQuiz,
  };

  it("should render correctly", () => {
    expect(toJson(shallow(<ViewQuizzes {...props} />))).toMatchSnapshot();
  });

  it("should match snapshot of the user has view rights", () => {
    const wrapper = shallow(
      <ViewQuizzes {...props} loggedInUserType={userTypes.view} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot of the user has restricted rights", () => {
    const wrapper = shallow(
      <ViewQuizzes {...props} loggedInUserType={userTypes.restricted} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
