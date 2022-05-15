import React from "react";
import { shallow } from "enzyme";
import NumberInput, { handleKeyPress, handleChange } from "./NumberInput";

describe(" NumberInput component", () => {
  const mockOnChange = jest.fn();
  const component = (
    <NumberInput
      name="label name"
      labelText="label text"
      defaultValue={1}
      onChange={mockOnChange}
    />
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    expect(shallow(component)).toMatchSnapshot();
  });

  it("should concatenate the entered digit to the existing one when the resulting value is within the limits.", () => {
    expect(
      handleKeyPress(
        {
          target: { value: "5" },
          key: 2,
          preventDefault: () => {},
        },
        1,
        100
      )
    ).toBe("52");
  });

  it("should ignore the entered digit when the resulting value would be out of bounds.", () => {
    expect(
      handleKeyPress(
        {
          target: { value: "99" },
          key: 2,
          preventDefault: () => {},
        },
        1,
        100
      )
    ).toBe(undefined);
  });

  it("should remove any leading zeros and call the onChange function.", () => {
    expect(
      handleChange(
        {
          target: { value: "02" },
          preventDefault: () => {},
        },
        mockOnChange
      )
    ).toBe("2");
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("should not call the onChange function when a zero is entered after zero.", () => {
    handleChange(
      {
        target: { value: "00" },
        preventDefault: () => {},
      },
      mockOnChange
    );
    expect(mockOnChange).toHaveBeenCalledTimes(0);
  });
});
