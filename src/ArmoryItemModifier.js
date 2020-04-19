import React from "react";
import styles from "./ArmoryItemModifier.module.css";
import NumberInput from "./NumberInput";
import { useDispatch } from "react-redux";
import { setArmoryItem } from "./actions/armoryItems";
import {
  Radio,
  RadioGroup,
  Grid,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";

export default (props) => {
  const dispatch = useDispatch();
  const handleInputChange = (value, key) => {
    dispatch(setArmoryItem(value, key, props.id));
  };

  return (
    <FormControl component="fieldset" className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <RadioGroup
            style={{ display: "block ruby" }}
            aria-label="operator"
            name="operator"
            defaultValue={props.operatorValue || "="}
            onChange={(evt) =>
              handleInputChange(evt.target.value, props.operatorKey)
            }
          >
            <FormControlLabel value="=" control={<Radio />} label="=" />
            <FormControlLabel value="+" control={<Radio />} label="+" />
            <FormControlLabel value="-" control={<Radio />} label="-" />
          </RadioGroup>
        </Grid>
        <Grid item xs>
          <NumberInput
            labelText={props.labelText}
            defaultValue={props.value}
            onChange={(evt) =>
              handleInputChange(evt.target.value, props.valueKey)
            }
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};
