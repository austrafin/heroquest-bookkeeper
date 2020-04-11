import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ArmoryItemModifier.module.css";
import NumberInput from "./NumberInput";
import { setArmoryItem } from "./actions/armoryItems";
import {
  Radio,
  RadioGroup,
  Grid,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

const ArmoryItemModifier = (props) => {
  return (
    <FormControl component="fieldset" className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <RadioGroup
            style={{ display: "block ruby" }}
            aria-label="operator"
            name="operator"
            defaultValue={props.operatorValue || "="}
          >
            <FormControlLabel value="=" control={<Radio />} label="=" />
            <FormControlLabel value="+" control={<Radio />} label="+" />
            <FormControlLabel value="-" control={<Radio />} label="-" />
          </RadioGroup>
        </Grid>
        <Grid item xs>
          <NumberInput labelText={props.labelText} defaultValue={props.value} />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default ArmoryItemModifier;
