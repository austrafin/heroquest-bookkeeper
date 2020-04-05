import React from "react";
import Collapsible from "react-collapsible";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { Grid, TextField } from "@material-ui/core";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

const ArmoryItem = props => {
  return (
    <Collapsible
      trigger={
        <CollapsibleTriggerLabel
          labelText="Armory item"
          icon={<ArrowDropDown />}
        />
      }
      triggerWhenOpen={
        <CollapsibleTriggerLabel
          labelText="Armory item"
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
        />
        <ArmoryItemModifier labelText="Melee" />
        <ArmoryItemModifier labelText="Ranged" />
        <ArmoryItemModifier labelText="Diagonal" />
        <ArmoryItemModifier labelText="Defence" />
        <ArmoryItemModifier labelText="Movement" />
      </Grid>
    </Collapsible>
  );
};

export default ArmoryItem;
