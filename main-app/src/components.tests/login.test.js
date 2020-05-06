import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import Login from "../components/login";

describe("Login", () => {
  it("should render correctly", () => {
    expect(
      toJson(shallow(<Login loginStateChange={jest.fn()} />))
    ).toMatchSnapshot();
  });
});
