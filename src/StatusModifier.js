import React, { useRef } from "react";
import NumberInput from "./NumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";

function changeStatus(input, label, defaultValue, add) {
  if (input && label) {
    var currentValue = label.current.innerHTML;
    if (currentValue === null || currentValue === "") {
      label.current.innerHTML = "";
    } else if (add) {
      label.current.innerHTML =
        Number(currentValue) + Number(input.current.value);
    } else {
      label.current.innerHTML =
        Number(currentValue) - Number(input.current.value);
    }
    input.current.value = defaultValue;
  }
}

const StatusModifier = ({
  maxValue = 100,
  step = 1,
  defaultValue = 1,
  labelText,
  labelReference
}) => {
  const inputRef = useRef(null);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <NumberInput
          reference={inputRef}
          labelText={labelText}
          maxValue={maxValue}
          step={step}
          defaultValue={defaultValue}
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
            onClick={() =>
              changeStatus(inputRef, labelReference, defaultValue, true)
            }
          >
            +
          </Button>
          <Button
            onClick={() => changeStatus(inputRef, labelReference, defaultValue)}
          >
            -
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default StatusModifier;
