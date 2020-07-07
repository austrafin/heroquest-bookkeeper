import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
    <form onSubmit={props.submit} method="POST">
      <TextField
        name="name"
        className={styles.name}
        required
        label="Name"
        value={name}
        onChange={handleTextFieldChange}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Melee"
        valueKey={"meleePoints"}
        operatorKey={"meleeOperator"}
        operatorValue={props.meleeOperator}
        value={props.meleePoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Ranged"
        valueKey={"rangedPoints"}
        operatorKey={"rangedOperator"}
        operatorValue={props.rangedOperator}
        value={props.rangedPoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Diagonal"
        valueKey={"diagonalPoints"}
        operatorKey={"diagonalOperator"}
        operatorValue={props.diagonalOperator}
        value={props.diagonalPoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Defence"
        valueKey={"defencePoints"}
        operatorKey={"defenceOperator"}
        operatorValue={props.defenceOperator}
        value={props.defencePoints}
      />

      <ArmoryItemModifier
        id={props.id}
        labelText="Movement"
        valueKey={"movementPoints"}
        operatorKey={"movementOperator"}
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
