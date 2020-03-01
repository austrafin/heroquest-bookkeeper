import React from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setInputValue } from "./actions/inputValue";

const NumberInput = ({
  labelText,
  maxValue = 100,
  step = 1,
  defaultValue,
  labelParameter
}) => {
  const dispatch = useDispatch();
  return (
    <TextField
      id="standard-basic"
      label={labelText}
      type="number"
      defaultValue={defaultValue}
      inputProps={{
        min: 0,
        max: maxValue,
        step: step
      }}
      onKeyPress={(evt, value = maxValue) => {
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 47 &&
          charCode < 58 &&
          evt.target.value + evt.key <= value
        ) {
          if (evt.target.value[0] === "0") {
            if (charCode === 48) {
              evt.preventDefault();
            } else {
              evt.target.value = evt.target.value.slice(1);
            }
          }
        } else {
          evt.preventDefault();
        }
      }}
      onChange={evt => {
        dispatch(setInputValue(Number(evt.target.value), labelParameter));
      }}
    />
  );
};

export default NumberInput;
