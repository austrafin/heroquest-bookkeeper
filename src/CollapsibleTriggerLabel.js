import React from "react";
import styles from "./CollapsibleTriggerLabel.module.css";

export default (props) => {
  return (
    <>
      <span className={styles.label}>{props.labelText}</span>
      <span className={styles.icon}>{props.icon}</span>
    </>
  );
};
