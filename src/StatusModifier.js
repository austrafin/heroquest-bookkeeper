import React, { useState } from "react";
import NumberInput from "./NumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";

const StatusModifier = props => {
  const [inputValue, setInputValue] = useState(props.defaultValue);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <NumberInput
          labelText={props.labelText}
          maxValue={props.maxValue}
          step={props.step}
          defaultValue={props.defaultValue}
          setValue={setInputValue}
        />
      </Grid>
      <Grid item xs>
        <ButtonGroup
          color="primary"
          variant="contained"
          fullWidth={true}
          style={{ marginTop: 12 }}
        >
          <Button
            onClick={() => props.setLabelValue(props.labelValue + inputValue)}
          >
            +
          </Button>
          <Button
            onClick={() => props.setLabelValue(props.labelValue - inputValue)}
          >
            -
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default StatusModifier;
