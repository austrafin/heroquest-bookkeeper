import React from "react";
import { useDispatch } from "react-redux";
import Collapsible from "react-collapsible";
import ArmoryItemForm from "./ArmoryItemForm";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { updateArmoryItem } from "./actions/armoryItems";

export default (props) => {
  const dispatch = useDispatch();
  const submit = (event) => {
    event.preventDefault();
    const data = {};

    [...event.target].forEach((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        (input.type === "radio" && input.checked)
      )
        data[input.name] = input.value;
    });
    dispatch(updateArmoryItem(props.data._id, data));
  };

  return (
    <>
      <Collapsible
        trigger={
          <CollapsibleTriggerLabel
            labelText={props.data.name}
            icon={<ArrowDropDown />}
          />
        }
        triggerWhenOpen={
          <CollapsibleTriggerLabel
            labelText={props.data.name}
            icon={<ArrowDropUp />}
          />
        }
        className={styles.collabsibleOpened}
        openedClassName={styles.collabsibleOpened}
        transitionTime={150}
      >
        <ArmoryItemForm
          submit={submit}
          submitButtonText="Save changes"
          name={props.data.name}
          meleeOperator={props.data.meleeOperator}
          meleePoints={props.data.meleePoints}
          rangedOperator={props.data.rangedOperator}
          rangedPoints={props.data.rangedPoints}
          diagonalOperator={props.data.diagonalOperator}
          diagonalPoints={props.data.diagonalPoints}
          defenceOperator={props.data.defenceOperator}
          defencePoints={props.data.defencePoints}
          movementOperator={props.data.movementOperator}
          movementPoints={props.data.movementPoints}
        />
      </Collapsible>
    </>
  );
};
