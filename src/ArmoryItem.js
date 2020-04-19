import React from "react";
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
          <TextField
            className={styles.name}
            required
            id="standard-required"
            label="Name"
            value={props.data.name}
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
          <Button
            color="primary"
            onClick={() => dispatch(updateArmoryItem(props.data._id))}
          >
            Save changes
          </Button>
        </Grid>
      </Collapsible>
    </>
  );
};
