import React from "react";
import { shallow } from "enzyme";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";

describe("CollapsibleTriggerLabel component", () => {
  it("renders correctly", () => {
    expect(shallow(<CollapsibleTriggerLabel />)).toMatchSnapshot();
  });
});
