import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import NewQuestion from "../components/add-new-question";
import { mockQuiz } from "./test-helper";

describe("NewQuestion", () => {
  const props = {
    newQuestion: false,
    quiz: {},
    onQuizUpdated: jest.fn(),
  };

  it("should render correctly", () => {
    expect(toJson(shallow(<NewQuestion {...props} />))).toMatchSnapshot();
  });

  it("should match snapshot when there is a quiz", () => {
    const wrapper = shallow(<NewQuestion {...props} quiz={mockQuiz[0]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot when newQuestion is true", () => {
    const wrapper = shallow(<NewQuestion {...props} newQuestion />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
