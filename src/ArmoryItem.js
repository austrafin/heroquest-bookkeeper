import React, { useState, useEffect } from "react";
import Collapsible from "react-collapsible";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { Grid, TextField, Button } from "@material-ui/core";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import axios from "axios";

const ArmoryItem = (props) => {
  const [hasLoaded, setLoaded] = useState(null);
  const [values, setValues] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/armory_items/" + props.id)
      .then((response) => {
        const vals = {};
        response.data.forEach((item) => {
          vals["name"] = item.name;
          vals["meleePoints"] = item.meleePoints;
          vals["meleeOperator"] = item.meleeOperator;
          vals["rangedPoints"] = item.rangedPoints;
          vals["rangedOperator"] = item.rangedOperator;
          vals["diagonalPoints"] = item.diagonalPoints;
          vals["diagonalOperator"] = item.diagonalOperator;
          vals["defencePoints"] = item.defencePoints;
          vals["defenceOperator"] = item.defenceOperator;
          vals["movementPoints"] = item.movementPoints;
          vals["movementOperator"] = item.movementOperator;
        });
        setValues(vals);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!hasLoaded) {
    return "Loading...";
  }

  return (
    <>
      <Collapsible
        trigger={
          <CollapsibleTriggerLabel
            labelText={values.name}
            icon={<ArrowDropDown />}
          />
        }
        triggerWhenOpen={
          <CollapsibleTriggerLabel
            labelText={values.name}
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
            value={values.name}
          />
          <ArmoryItemModifier
            labelText="Melee"
            valueKey={"meleePoints"}
            operatorKey={"meleeOperator"}
            operatorValue={values.meleeOperator}
            value={values.meleePoints}
          />
          <ArmoryItemModifier
            labelText="Ranged"
            valueKey={"rangedPoints"}
            operatorKey={"rangedOperator"}
            operatorValue={values.rangedOperator}
            value={values.rangedPoints}
          />
          <ArmoryItemModifier
            labelText="Diagonal"
            valueKey={"diagonalPoints"}
            operatorKey={"diagonalOperator"}
            operatorValue={values.diagonalOperator}
            value={values.diagonalPoints}
          />
          <ArmoryItemModifier
            labelText="Defence"
            valueKey={"defencePoints"}
            operatorKey={"defenceOperator"}
            operatorValue={values.defenceOperator}
            value={values.defencePoints}
          />
          <ArmoryItemModifier
            labelText="Movement"
            valueKey={"movementPoints"}
            operatorKey={"movementOperator"}
            operatorValue={values.movementOperator}
            value={values.movementPoints}
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
