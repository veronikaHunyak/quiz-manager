import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import NewAnswer from "../components/add-new-answer";
import { mockQuiz } from "./test-helper";

describe("NewAnswer", () => {
  const props = {
    questionIndex: 0,
    quiz: mockQuiz[0],
  };

  it("should render correctly", () => {
    expect(toJson(shallow(<NewAnswer {...props} />))).toMatchSnapshot();
  });
});
