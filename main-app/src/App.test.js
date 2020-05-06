import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import App, { userTypes } from "./App";

describe("App", () => {
  it("should match snapshot if user is logged out", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot if user is logged in", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ loggedIn: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot if user has edit rights", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ userType: userTypes.edit, loggedIn: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot if user has view rights", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ userType: userTypes.view, loggedIn: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should match snapshot if user has restricted rights", () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ userType: userTypes.restricted, loggedIn: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
