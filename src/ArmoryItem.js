import React from "react";
import Collapsible from "react-collapsible";
import ArmoryItemModifier from "./ArmoryItemModifier";
import { Grid, TextField } from "@material-ui/core";
import styles from "./ArmoryItem.module.css";

const ArmoryItem = props => {
  return (
    <Collapsible
      trigger="Armory item"
      className={styles.collabsibleOpened}
      openedClassName={styles.collabsibleOpened}
      triggerClassName={styles.collabsibleLabel}
      triggerOpenedClassName={styles.collabsibleLabel}
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
