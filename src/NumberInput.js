import React from "react";
import TextField from "@material-ui/core/TextField";

export const handleKeyPress = (evt, minValue, maxValue) => {
  const enteredCharCode = evt.which ? evt.which : evt.keyCode;
  const newValue = evt.target.value + evt.key;

  if (
    enteredCharCode <= 47 ||
    enteredCharCode >= 58 ||
    newValue < minValue ||
    newValue > maxValue
  ) {
    evt.preventDefault();
    return;
  }
  return newValue;
};

export const handleChange = (evt, onChange) => {
  if (evt.target.value[0] === "0" && evt.target.value.length > 1) {
    evt.target.value = evt.target.value.slice(1); // Remove the leading zero

    if (evt.target.value === "0") {
      // No action required for double zero
      evt.preventDefault();
      return evt.target.value;
    }
  }
  onChange(evt);

  return evt.target.value;
};

export default (props) => {
  const minValue = props.minValue ?? 0;
  const maxValue = props.maxValue ?? 100;
  const step = props.step ?? 1;

  return (
    <TextField
      name={props.name}
      label={props.labelText}
      type="number"
      defaultValue={props.defaultValue}
      inputProps={{
        min: minValue,
        max: maxValue,
        step: step,
      }}
      onKeyPress={(evt) => handleKeyPress(evt, minValue, maxValue)}
      onChange={(evt) => handleChange(evt, props.onChange)}
      data-test="test-number-input"
    />
  );
};
