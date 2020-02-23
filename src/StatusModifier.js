import React, { useRef } from "react";
import NumberInput from "./NumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";

function addToStatus(input) {
  input.current.value = "";
}

function takeFromStatus(input) {
  input.current.value = "";
}

const StatusModifier = ({ maxValue = 100, step = 1, labelText }) => {
  const inputRef = useRef(null);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <NumberInput
          reference={inputRef}
          labelText={labelText}
          maxValue={maxValue}
          step={step}
        />
      </Grid>
      <Grid item xs>
        <ButtonGroup color="primary" variant="contained" fullWidth={true}>
          <Button onClick={() => addToStatus(inputRef)}>+</Button>
          <Button onClick={() => takeFromStatus(inputRef)}>-</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default StatusModifier;
