import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInputValue } from "./actions/inputValue";
import NumberInput from "./NumberInput";

const CardNumberInput = ({
  labelText,
  maxValue = 100,
  step = 1,
  defaultValue,
  labelParameter,
  cardId
}) => {
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.inputValue);

  if (
    inputValue[cardId] === undefined ||
    inputValue[cardId][labelParameter] === undefined
  ) {
    dispatch(setInputValue(defaultValue, labelParameter, cardId));
  }

  return (
    <NumberInput
      labelText={labelText}
      defaultValue={defaultValue}
      maxValue={maxValue}
      step={step}
      onChange={evt => {
        dispatch(
          setInputValue(Number(evt.target.value), labelParameter, cardId)
        );
      }}
    />
  );
};

export default CardNumberInput;
