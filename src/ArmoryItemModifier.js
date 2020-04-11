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

const ArmoryItemModifier = (props) => {
  const dispatch = useDispatch();

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
              dispatch(
                setArmoryItem(evt.target.value, props.operatorKey, props.id)
              )
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
              dispatch(
                setArmoryItem(evt.target.value, props.valueKey, props.id)
              )
            }
          />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default ArmoryItemModifier;
