import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "./CollapsibleTriggerLabel.module.css";

const CollapsibleTriggerLabel = props => {
  return (
    <>
      <span className={styles.label}>{props.labelText}</span>
      <span className={styles.icon}>{props.icon}</span>
    </>
  );
};

export default CollapsibleTriggerLabel;