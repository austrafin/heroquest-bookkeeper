import React from "react";
import { useDispatch } from "react-redux";
import { REDUX_STORE_FIELDS as Constants } from "./constants/armory_item.constants";
import Collapsible from "react-collapsible";
import ArmoryItemForm from "./ArmoryItemForm";
import styles from "./ArmoryItem.module.css";
import CollapsibleTriggerLabel from "./CollapsibleTriggerLabel";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { updateArmoryItem } from "./actions/armoryItems";

const ArmoryItem = (props) => {
  const dispatch = useDispatch();
  const submit = (event) => {
    event.preventDefault();
    const data = {};

    [...event.target.elements].forEach((input) => {
      if (
        input.type === "text" ||
        input.type === "number" ||
        (input.type === "radio" && input.checked)
      )
        data[input.name] = input.value;
    });
    dispatch(updateArmoryItem(props.data[Constants.ID], data));
  };

  return (
    <>
      <Collapsible
        trigger={
          <CollapsibleTriggerLabel
            labelText={props.data[Constants.NAME]}
            icon={<ArrowDropDown />}
          />
        }
        triggerWhenOpen={
          <CollapsibleTriggerLabel
            labelText={props.data[Constants.NAME]}
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
          testSubmitForm={props.testSubmitForm}
          delete={true}
          id={props.data[Constants.ID]}
          name={props.data[Constants.NAME]}
          meleeOperator={props.data[Constants.MELEE_OPERATOR]}
          meleePoints={props.data[Constants.MELEE_POINTS]}
          rangedOperator={props.data[Constants.RANGED_OPERATOR]}
          rangedPoints={props.data[Constants.RANGED_POINTS]}
          diagonalOperator={props.data[Constants.DIAGONAL_OPERATOR]}
          diagonalPoints={props.data[Constants.DIAGONAL_POINTS]}
          defenceOperator={props.data[Constants.DEFENCE_OPERATOR]}
          defencePoints={props.data[Constants.DEFENCE_POINTS]}
          movementOperator={props.data[Constants.MOVEMENT_OPERATOR]}
          movementPoints={props.data[Constants.MOVEMENT_POINTS]}
        />
      </Collapsible>
    </>
  );
};

export default ArmoryItem;
