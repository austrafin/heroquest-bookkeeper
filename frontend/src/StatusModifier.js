import React from "react";
import CardNumberInput from "./CardNumberInput";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "./actions/playerCards";

export default (props) => {
  const dispatch = useDispatch();
  const inputValues = useSelector(
    (state) => state.playerCards.cardData[props.cardId].inputValues
  );

  const handleButtonClick = (dispatchFunction) => {
    dispatch(
      dispatchFunction(
        inputValues[props.labelParameter],
        props.labelParameter,
        props.cardId
      )
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <CardNumberInput
          labelText={props.labelText}
          minValue={1}
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
            data-test="increment"
            onClick={() => handleButtonClick(increment)}
          >
            +
          </Button>
          <Button
            data-test="decrement"
            onClick={() => handleButtonClick(decrement)}
          >
            -
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
