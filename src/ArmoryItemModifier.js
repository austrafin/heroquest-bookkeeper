import React from "react";
import styles from "./ArmoryItemModifier.module.css";
import NumberInput from "./NumberInput";
import {
  Radio,
  RadioGroup,
  Grid,
  FormControlLabel,
  FormControl
} from "@material-ui/core";

const ArmoryItemModifier = props => {
  const [value, setValue] = React.useState("=");

  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={styles.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <RadioGroup
            style={{ display: "block ruby" }}
            aria-label="operator"
            name="operator"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="=" control={<Radio />} label="=" />
            <FormControlLabel value="+" control={<Radio />} label="+" />
            <FormControlLabel value="-" control={<Radio />} label="-" />
          </RadioGroup>
        </Grid>
        <Grid item xs>
          <NumberInput labelText={props.labelText} />
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default ArmoryItemModifier;
