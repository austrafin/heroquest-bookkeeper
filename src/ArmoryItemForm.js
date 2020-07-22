import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { REDUX_STORE_FIELDS as Constants } from "./constants/armory_item.constants";
import styles from "./ArmoryItemForm.module.css";
import { Button, TextField } from "@material-ui/core";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { deleteArmoryItem } from "./actions/armoryItems";

export default (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.name ?? "");
  const handleTextFieldChange = (event) => {
    setName(event.target.value);
  };

  let deleteButton = null;

  if (props.delete)
    deleteButton = (
      <Button
        style={{
          backgroundColor: "red",
          margin: "10px",
        }}
        onClick={() => {
          dispatch(deleteArmoryItem(props.id));
        }}
      >
        Delete item
      </Button>
    );

  return (
    <form onSubmit={props.submit} method="POST" data-test="submit">
      <TextField
        name={Constants.NAME}
        className={styles.name}
        required
        label="Name"
        value={name}
        onChange={handleTextFieldChange}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Melee"
        valueKey={Constants.MELEE_POINTS}
        operatorKey={Constants.MELEE_OPERATOR}
        operatorValue={props.meleeOperator}
        value={props.meleePoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Ranged"
        valueKey={Constants.RANGED_POINTS}
        operatorKey={Constants.RANGED_OPERATOR}
        operatorValue={props.rangedOperator}
        value={props.rangedPoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Diagonal"
        valueKey={Constants.DIAGONAL_POINTS}
        operatorKey={Constants.DIAGONAL_OPERATOR}
        operatorValue={props.diagonalOperator}
        value={props.diagonalPoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Defence"
        valueKey={Constants.DEFENCE_POINTS}
        operatorKey={Constants.DEFENCE_OPERATOR}
        operatorValue={props.defenceOperator}
        value={props.defencePoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Movement"
        valueKey={Constants.MOVEMENT_POINTS}
        operatorKey={Constants.MOVEMENT_OPERATOR}
        operatorValue={props.movementOperator}
        value={props.movementPoints}
      />

      <Button style={{ backgroundColor: "blue", margin: "10px" }} type="submit">
        {props.submitButtonText}
      </Button>

      {deleteButton}
    </form>
  );
};
