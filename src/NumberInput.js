import React from "react";
import TextField from "@material-ui/core/TextField";

const NumberInput = (props) => {
  const minValue = props.minValue || 0;
  const maxValue = props.maxValue || 100;
  const step = props.step || 1;

  const handleKeyPress = (evt) => {
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

    if (evt.target.value[0] === "0") {
      /* Prevent input if the first character is zero and the entered character is also zero.
           else remove the first zero. */
      enteredCharCode === 48
        ? evt.preventDefault()
        : (evt.target.value = evt.target.value.slice(1));
    }
  };

  return (
    <TextField
      label={props.labelText}
      type="number"
      defaultValue={props.defaultValue}
      inputProps={{
        min: minValue,
        max: maxValue,
        step: step,
      }}
      onKeyPress={(evt) => handleKeyPress(evt)}
      onChange={props.onChange}
    />
  );
};

export default NumberInput;
