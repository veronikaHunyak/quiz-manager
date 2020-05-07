import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import AddQuizzes from "../components/add-quizzes";
import { mockQuiz } from "./test-helper";

describe("AddQuizzes", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<AddQuizzes />);
    wrapper.setState({ quiz: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot when quizzes is populated", () => {
    const wrapper = shallow(<AddQuizzes />);
    wrapper.setState({ quizzes: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
