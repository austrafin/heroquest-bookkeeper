import React, { useState } from "react";
import styles from "./ArmoryItemForm.module.css";
import { Button, TextField } from "@material-ui/core";
import ArmoryItemModifier from "./ArmoryItemModifier";

export default (props) => {
  const [name, setName] = useState(props.name ?? "");
  const handleTextFieldChange = (event) => {
    setName(event.target.value);
  };

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
        id={props._id}
        labelText="Melee"
        valueKey={"meleePoints"}
        operatorKey={"meleeOperator"}
        operatorValue={props.meleeOperator}
        value={props.meleePoints}
      />

      <ArmoryItemModifier
        id={props._id}
        labelText="Ranged"
        valueKey={"rangedPoints"}
        operatorKey={"rangedOperator"}
        operatorValue={props.rangedOperator}
        value={props.rangedPoints}
      />

      <ArmoryItemModifier
        id={props._id}
        labelText="Diagonal"
        valueKey={"diagonalPoints"}
        operatorKey={"diagonalOperator"}
        operatorValue={props.diagonalOperator}
        value={props.diagonalPoints}
      />

      <ArmoryItemModifier
        id={props._id}
        labelText="Defence"
        valueKey={"defencePoints"}
        operatorKey={"defenceOperator"}
        operatorValue={props.defenceOperator}
        value={props.defencePoints}
      />

      <ArmoryItemModifier
        id={props._id}
        labelText="Movement"
        valueKey={"movementPoints"}
        operatorKey={"movementOperator"}
        operatorValue={props.movementOperator}
        value={props.movementPoints}
      />

      <Button color="primary" type="submit">
        {props.submitButtonText}
      </Button>
    </form>
  );
};
