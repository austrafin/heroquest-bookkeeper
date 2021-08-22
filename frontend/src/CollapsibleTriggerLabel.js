import React from "react";
import styles from "./CollapsibleTriggerLabel.module.css";

const CollapsibleTriggerLabel = (props) => {
  return (
    <div>
      <span className={styles.label}>{props.labelText}</span>
      <span className={styles.icon}>{props.icon}</span>
    </div>
  );
};

export default CollapsibleTriggerLabel;
