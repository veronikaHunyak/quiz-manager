import React from "react";
import { shallow } from "enzyme";

import Login from "../components/login";

describe("Login", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render correctly", () => {
    expect(shallow(<Login loginStateChange={jest.fn()} />)).toMatchSnapshot();
  });

  it("should call handleChange when the user types in the username field", async () => {
    const wrapper = shallow(<Login loginStateChange={jest.fn()} />);
    const event = {
      preventDefault() {},
      target: {
        value: "username",
        id: "username",
      },
    };
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, "handleChange");

    wrapper.find("#username").simulate("change", event);

    expect(spy).toHaveBeenCalledWith(event);
    expect(instance.handleChange).toHaveBeenCalledTimes(1);
  });

  it("should call handleChange when the user types in the password field", () => {
    const wrapper = shallow(<Login loginStateChange={jest.fn()} />);
    const event = {
      preventDefault() {},
      target: { value: "password" },
    };
    // wrapper.find("input#password").simulate("change", event);
  });

  //   it("should hide the password input", () => {
  //     const wrapper = shallow(<Login loginStateChange={props} />);
  //   });
});
