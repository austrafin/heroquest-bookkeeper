import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button } from "@material-ui/core";
import { loadPlayerCards, addPlayerCard } from "./actions/playerCards";
import PlayerCard from "./PlayerCard";
import PlayerCardForm from "./PlayerCardForm";
import styles from "./GamePage.module.css";
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

export default () => {
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
        <PlayerCard imagePath={values.image} cardId={cardId} />
      </Grid>
    );

    return cards;
  });

  const handleOpen = () => {
    setModalOpen(true);
  };

  const submit = (event) => {
    const data = {};

    [...event.target].forEach((input) => {
      if (input.name !== "") data[input.name] = input.value;
    });

    dispatch(addPlayerCard(data));
  };

  return (
    <>
      <Button
        style={{ backgroundColor: "blue", marginBottom: "10px" }}
        onClick={handleOpen}
      >
        Add character
      </Button>

      <PlayerCardForm
        title="Add new character"
        submitFunction={submit}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <Grid container spacing={4}>
        {cards}
      </Grid>
    </>
  );
};
