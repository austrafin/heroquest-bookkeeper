import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "../../actions/playerCards";
import NumberInput from "../Common/NumberInput";

const CardNumberInput = (props) => {
  const dispatch = useDispatch();
  const inputValues = useSelector(
    (state) => state.playerCards.cardData[props.cardId].inputValues
  );
  const minValue = props.minValue ?? 1;
  const maxValue = props.maxValue ?? 100;
  const step = props.step ?? 1;
  const handleInputChange = (value) => {
    dispatch(setInputValue(Number(value), props.labelParameter, props.cardId));
  };

  if (
    inputValues === undefined ||
    inputValues[props.labelParameter] === undefined
  ) {
    handleInputChange(props.defaultValue);
  }

  return (
    <NumberInput
      labelText={props.labelText}
      defaultValue={props.defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      onChange={(evt) => handleInputChange(evt.target.value)}
    />
  );
};

export default CardNumberInput;
