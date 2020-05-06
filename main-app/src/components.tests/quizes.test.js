import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import ViewQuizes from "../components/quizes";
import { userTypes } from "../App";
import { mockQuiz } from "./test-helper";

describe("ViewQuizes", () => {
  const props = {
    loggedInUserType: userTypes.edit,
    quizes: mockQuiz,
  };

  it("should render correctly", () => {
    expect(toJson(shallow(<ViewQuizes {...props} />))).toMatchSnapshot();
  });

  it("should match snapshot of the user has view rights", () => {
    const wrapper = shallow(
      <ViewQuizes {...props} loggedInUserType={userTypes.view} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot of the user has restricted rights", () => {
    const wrapper = shallow(
      <ViewQuizes {...props} loggedInUserType={userTypes.restricted} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
