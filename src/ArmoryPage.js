import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ArmoryItem from "./ArmoryItem";
import ArmoryItemForm from "./ArmoryItemForm";
import { initialiseArmoryItems, addArmoryItem } from "./actions/armoryItems";
import { Button, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: "100px",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default (props) => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const hasLoadedArmoryItems = useSelector(
    (state) => state.armoryItems.armoryItemsLoaded
  );
  const armoryItemsData = useSelector((state) => state.armoryItems);
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (hasLoadedArmoryItems) {
      return;
    }
    stableDispatch(initialiseArmoryItems());
  }, [stableDispatch, hasLoadedArmoryItems]);

  if (!hasLoadedArmoryItems) {
    return "Loading...";
  }

  const armoryItems = [];

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
      >
        Add armory item
      </Button>
      {armoryItems}

      <Modal open={modalOpen} onClose={handleClose}>
        <div className={classes.paper}>
          <h2>Add armory item</h2>
          <ArmoryItemForm submit={submit} submitButtonText={"Submit"} />
        </div>
      </Modal>
    </>
  );
};
