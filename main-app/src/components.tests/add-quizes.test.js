import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import AddQuizes from "../components/add-quizes";
import { mockQuiz } from "./test-helper";

describe("AddQuizes", () => {
  it("should render correctly", () => {
    const wrapper = shallow(<AddQuizes />);
    wrapper.setState({ quiz: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot when quizes is populated", () => {
    const wrapper = shallow(<AddQuizes />);
    wrapper.setState({ quizes: mockQuiz });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
