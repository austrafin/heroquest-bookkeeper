import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "./actions/inputValue";
import NumberInput from "./NumberInput";

const CardNumberInput = (props) => {
  const dispatch = useDispatch();
  const inputValue = useSelector((state) => state.inputValue);
  const minValue = props.minValue || 1;
  const maxValue = props.maxValue || 100;
  const step = props.step || 1;

  if (
    inputValue[props.cardId] === undefined ||
    inputValue[props.cardId][props.labelParameter] === undefined
  ) {
    dispatch(
      setInputValue(props.defaultValue, props.labelParameter, props.cardId)
    );
  }

  return (
    <NumberInput
      labelText={props.labelText}
      defaultValue={props.defaultValue}
      minValue={minValue}
      maxValue={maxValue}
      step={step}
      onChange={(evt) => {
        dispatch(
          setInputValue(
            Number(evt.target.value),
            props.labelParameter,
            props.cardId
          )
        );
      }}
    />
  );
};

export default CardNumberInput;
