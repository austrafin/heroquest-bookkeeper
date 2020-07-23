import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App component", () => {
  it("renders correctly", () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});
