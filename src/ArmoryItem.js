import React, { useState } from "react";
import Collapsible from "react-collapsible";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { Grid, TextField, Button } from "@material-ui/core";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { updateArmoryItem } from "./actions/armoryItems";

export default (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(props.data.name);
  const handleTextFieldChange = (event) => {
    setName(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
    const data = {};

    [...event.target].forEach((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        (input.type === "radio" && input.checked)
      )
        data[input.name] = input.value;
    });
    dispatch(updateArmoryItem(props.data._id, data));
  };

  return (
    <>
      <Collapsible
        trigger={
          <CollapsibleTriggerLabel
            labelText={props.data.name}
            icon={<ArrowDropDown />}
          />
        }
        triggerWhenOpen={
          <CollapsibleTriggerLabel
            labelText={props.data.name}
            icon={<ArrowDropUp />}
          />
        }
        className={styles.collabsibleOpened}
        openedClassName={styles.collabsibleOpened}
        transitionTime={150}
      >
        <Grid container direction="column">
          <form onSubmit={submit} method="POST">
            <TextField
              name="name"
              className={styles.name}
              required
              label="Name"
              value={name}
              onChange={handleTextFieldChange}
            />
            <ArmoryItemModifier
              id={props.data._id}
              labelText="Melee"
              valueKey={"meleePoints"}
              operatorKey={"meleeOperator"}
              operatorValue={props.data.meleeOperator}
              value={props.data.meleePoints}
            />
            <ArmoryItemModifier
              id={props.data._id}
              labelText="Ranged"
              valueKey={"rangedPoints"}
              operatorKey={"rangedOperator"}
              operatorValue={props.data.rangedOperator}
              value={props.data.rangedPoints}
            />
            <ArmoryItemModifier
              id={props.data._id}
              labelText="Diagonal"
              valueKey={"diagonalPoints"}
              operatorKey={"diagonalOperator"}
              operatorValue={props.data.diagonalOperator}
              value={props.data.diagonalPoints}
            />
            <ArmoryItemModifier
              id={props.data._id}
              labelText="Defence"
              valueKey={"defencePoints"}
              operatorKey={"defenceOperator"}
              operatorValue={props.data.defenceOperator}
              value={props.data.defencePoints}
            />
            <ArmoryItemModifier
              id={props.data._id}
              labelText="Movement"
              valueKey={"movementPoints"}
              operatorKey={"movementOperator"}
              operatorValue={props.data.movementOperator}
              value={props.data.movementPoints}
            />
            <Button color="primary" type="submit">
              Save changes
            </Button>
          </form>
        </Grid>
      </Collapsible>
    </>
  );
};
