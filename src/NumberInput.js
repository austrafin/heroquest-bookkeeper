import React from "react";
import { TextField } from "@material-ui/core";

const NumberInput = ({ labelText, maxValue = "100", step = "1" }) => {
  return (
    <TextField
      id="standard-basic"
      label={labelText}
      type="number"
      inputProps={{ min: "0", maxValue, step }}
      onKeyPress={evt => {
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 47 &&
          charCode < 58 &&
          evt.target.value + evt.key <= 100
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
    />
  );
};

export default NumberInput;
