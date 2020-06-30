import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, Modal, TextField } from "@material-ui/core";
import {
  addPlayerCard,
  loadPlayerCards,
  setValue,
} from "./actions/playerCards";
import PlayerCard from "./PlayerCard";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./GamePage.module.css";
import NumberInput from "./NumberInput";
import { initialiseArmoryItems } from "./actions/armoryItems";

const calculateStatusPoints = (item, currentValue, pointsKey, operatorKey) => {
  let add = 0;
  let newValue = currentValue;

  if (item[pointsKey] > currentValue && item[operatorKey] === "=") {
    newValue = item[pointsKey];
  } else if (item[operatorKey] === "+") {
    add += item[pointsKey];
  } else if (item[operatorKey] === "-") {
    add -= item[pointsKey];
  }

  newValue += add;

  return newValue;
};

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

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const playerCardData = useSelector((state) => state.playerCards.cardData);
  const armoryItemsData = useSelector((state) => state.armoryItems);
  const hasLoaded = useSelector((state) => state.playerCards.cardsLoaded);
  const hasLoadedArmoryItems = useSelector(
    (state) => state.armoryItems.armoryItemsLoaded
  );
  const newCardUploading = useSelector(
    (state) => state.playerCards.newCardUploading
  );
  const stableDispatch = useCallback(dispatch, []);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (newCardUploading || hasLoaded) {
      return;
    }
    stableDispatch(loadPlayerCards());
  }, [stableDispatch, newCardUploading]);

  useEffect(() => {
    if (hasLoadedArmoryItems) {
      return;
    }
    stableDispatch(initialiseArmoryItems());
  }, [stableDispatch]);

  if (!hasLoaded || !hasLoadedArmoryItems || newCardUploading) {
    return "Loading...";
  }

  const cards = [];

  Object.entries(playerCardData).map(([cardId, values]) => {
    if (values.armoryItems.length > 0) {
      let meleePoints = values.baseMeleePoints;
      let rangedPoints = values.baseRangedPoints;
      let diagonalPoints = values.baseDiagonalPoints;
      let defencePoints = values.baseDefencePoints;
      let movementPoints = values.baseMovementPoints;

      values.armoryItems.map((itemId) => {
        const item = armoryItemsData.items[itemId];
        meleePoints = calculateStatusPoints(
          item,
          meleePoints,
          "meleePoints",
          "meleeOperator"
        );
        rangedPoints = calculateStatusPoints(
          item,
          rangedPoints,
          "rangedPoints",
          "rangedOperator"
        );
        diagonalPoints = calculateStatusPoints(
          item,
          diagonalPoints,
          "diagonalPoints",
          "diagonalOperator"
        );
        defencePoints = calculateStatusPoints(
          item,
          defencePoints,
          "defencePoints",
          "defenceOperator"
        );
        movementPoints = calculateStatusPoints(
          item,
          movementPoints,
          "movementPoints",
          "movementOperator"
        );

        values["meleePoints"] = meleePoints;
        values["rangedPoints"] = rangedPoints;
        values["diagonalPoints"] = diagonalPoints;
        values["defencePoints"] = defencePoints;
        values["movementPoints"] = movementPoints;

        return true;
      });
    }

    cards.push(
      <Grid item xs key={cardId} className={styles.root}>
        <PlayerCard
          imagePath={values.image}
          characterName={values.characterName}
          cardId={cardId}
        />
      </Grid>
    );

    return cards;
  });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const submit = (event) => {
    const data = {};

    [...event.target].forEach((input) => {
      if (input.name !== "") data[input.name] = input.value;
    });

    dispatch(addPlayerCard(data));
    handleClose();
    event.preventDefault();
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Add new character</h2>
      <form onSubmit={submit} method="POST">
        <Grid container direction="column">
          <TextField name="characterName" label="Name" required />
          <NumberInput name="baseBodyPoints" labelText={"Base body points"} />
          <NumberInput name="baseMindPoints" labelText={"Base mind points"} />
          <NumberInput
            name="baseMeleePoints"
            labelText={"Base melee attack points"}
          />
          <NumberInput
            name="baseRangedPoints"
            labelText={"Base ranged attack points"}
          />
          <NumberInput
            name="baseDiagonalPoints"
            labelText={"Base diagonal attack points"}
          />
          <NumberInput
            name="baseDefencePoints"
            labelText={"Base defence points"}
          />
          <NumberInput
            name="baseMovementPoints"
            labelText={"Base movement points"}
          />
        </Grid>

        <Button
          type="submit"
          style={{ backgroundColor: "blue", marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Button
        style={{ backgroundColor: "blue", marginBottom: "10px" }}
        onClick={handleOpen}
      >
        Add character
      </Button>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Grid container spacing={4}>
        {cards}
      </Grid>
    </>
  );
};
