import React from "react";
import Collapsible from "react-collapsible";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { Grid, TextField, Button } from "@material-ui/core";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

const ArmoryItem = (props) => {
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
        triggerClassName={styles.collabsibleLabel}
        triggerOpenedClassName={styles.collabsibleLabel}
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
            labelText="Melee"
            valueKey={"meleePoints"}
            operatorKey={"meleeOperator"}
            operatorValue={props.data.meleeOperator}
            value={props.data.meleePoints}
          />
          <ArmoryItemModifier
            labelText="Ranged"
            valueKey={"rangedPoints"}
            operatorKey={"rangedOperator"}
            operatorValue={props.data.rangedOperator}
            value={props.data.rangedPoints}
          />
          <ArmoryItemModifier
            labelText="Diagonal"
            valueKey={"diagonalPoints"}
            operatorKey={"diagonalOperator"}
            operatorValue={props.data.diagonalOperator}
            value={props.data.diagonalPoints}
          />
          <ArmoryItemModifier
            labelText="Defence"
            valueKey={"defencePoints"}
            operatorKey={"defenceOperator"}
            operatorValue={props.data.defenceOperator}
            value={props.data.defencePoints}
          />
          <ArmoryItemModifier
            labelText="Movement"
            valueKey={"movementPoints"}
            operatorKey={"movementOperator"}
            operatorValue={props.data.movementOperator}
            value={props.data.movementPoints}
          />
          <Button color="primary" onClick={() => console.log("moi")}>
            Save changes
          </Button>
        </Grid>
      </Collapsible>
    </>
  );
};

export default ArmoryItem;
