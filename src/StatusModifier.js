import React from "react";
import NumberInput from "./NumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./actions/statusPoints";

const StatusModifier = props => {
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputValue[props.cardId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <NumberInput
          labelText={props.labelText}
          maxValue={props.maxValue}
          step={props.step}
          defaultValue={props.defaultValue}
          labelParameter={props.labelParameter}
          cardId={props.cardId}
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
              dispatch(
                increment(
                  inputValue[props.labelParameter],
                  props.labelParameter,
                  props.cardId
                )
              )
            }
          >
            +
          </Button>
          <Button
            onClick={() =>
              dispatch(
                decrement(
                  inputValue[props.labelParameter],
                  props.labelParameter,
                  props.cardId
                )
              )
            }
          >
            -
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default StatusModifier;
