import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArmoryItem from "./ArmoryItem";
import ArmoryItemForm from "./ArmoryItemForm";
import ModalForm from "./ModalForm";
import { loadArmoryItems, addArmoryItem } from "./actions/armoryItems";
import { Button } from "@material-ui/core";

const ArmoryPage = (props) => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, [dispatch]);
  const hasLoadedArmoryItems = useSelector(
    (state) => state.armoryItems.armoryItemsLoaded
  );
  const armoryItemsData = useSelector((state) => state.armoryItems);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (hasLoadedArmoryItems) {
      return;
    }
    stableDispatch(loadArmoryItems());
  }, [stableDispatch, hasLoadedArmoryItems]);

  if (!hasLoadedArmoryItems) {
    return "Loading...";
  }

  const armoryItems = [];

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
    dispatch(addArmoryItem(data));
    handleClose();
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  Object.entries(armoryItemsData.items).map(([key, item]) =>
    armoryItems.push(<ArmoryItem data={item} key={key} />)
  );

  return (
    <>
      <Button
        style={{ backgroundColor: "blue", marginBottom: "10px" }}
        onClick={handleOpen}
        data-test="add-button"
      >
        Add armory item
      </Button>
      {armoryItems}

      <ModalForm
        title="Add armory item"
        modalOpen={modalOpen}
        handleClose={handleClose}
      >
        <ArmoryItemForm
          submit={submit}
          submitButtonText={"Submit"}
          testSubmitForm={props.testSubmitForm}
        />
      </ModalForm>
    </>
  );
};

export default ArmoryPage;
