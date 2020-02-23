import React, { useRef } from "react";
import NumberInput from "./NumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";

function addGold(gold) {
  gold.current.value = "";
}

function takeGold(gold) {
  gold.current.value = "";
}

const PlayerGold = () => {
  const inputRef = useRef(null);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <NumberInput
          reference={inputRef}
          labelText={"Gold"}
          maxValue={10000}
          step={5}
        />
      </Grid>
      <Grid item xs>
        <ButtonGroup color="primary" variant="contained" fullWidth={true}>
          <Button onClick={() => addGold(inputRef)}>+</Button>
          <Button onClick={() => takeGold(inputRef)}>-</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default PlayerGold;
