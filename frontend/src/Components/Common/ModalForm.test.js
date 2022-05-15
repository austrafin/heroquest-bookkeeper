import React from "react";
import { shallow } from "enzyme";
import ModalForm from "./ModalForm";

describe("ModalForm component", () => {
  it("renders correctly", () => {
    expect(shallow(<ModalForm modalOpen={false} />)).toMatchSnapshot();
  });
});
