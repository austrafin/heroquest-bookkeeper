import React from "react";
import { TextField } from "@material-ui/core";

const HealthSpinner = ({ labelText }) => {
  return (
    <TextField
      id="standard-basic"
      label={labelText}
      type="number"
      inputProps={{ min: "0", max: "100", step: "1" }}
    />
  );
};

export default HealthSpinner;
