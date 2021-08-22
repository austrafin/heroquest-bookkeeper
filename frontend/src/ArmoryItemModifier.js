import React from "react";
import styles from "./ArmoryItemModifier.module.css";
import NumberInput from "./NumberInput";
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
            name={props.operatorKey}
            style={{ display: "block ruby" }}
            defaultValue={props.operatorValue || "="}
          >
            <FormControlLabel value="=" control={<Radio />} label="=" />
            <FormControlLabel value="+" control={<Radio />} label="+" />
            <FormControlLabel value="-" control={<Radio />} label="-" />
          </RadioGroup>
        </Grid>
        <Grid item xs>
          <NumberInput
            name={props.valueKey}
            labelText={props.labelText}
            defaultValue={props.value}
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default ArmoryItemModifier;
