import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { REDUX_STORE_FIELDS as PlayerCardConstants } from "./constants/player_card.constants";
import { REDUX_STORE_FIELDS as ArmoryItemConstants } from "./constants/armory_item.constants";
import { Grid, Button } from "@material-ui/core";
import { loadPlayerCards, addPlayerCard } from "./actions/playerCards";
import PlayerCard from "./PlayerCard";
import PlayerCardForm from "./PlayerCardForm";
import styles from "./GamePage.module.css";
import { loadArmoryItems } from "./actions/armoryItems";

const calculateStatusPoints = (item, currentValue, pointsKey, operatorKey) => {
  if (item === undefined) return currentValue;

  let add = 0;
  let newValue = Number(currentValue);

  if (item[pointsKey] > currentValue && item[operatorKey] === "=") {
    newValue = Number(item[pointsKey]);
  } else if (item[operatorKey] === "+") {
    add += Number(item[pointsKey]);
  } else if (item[operatorKey] === "-") {
    add -= Number(item[pointsKey]);
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
  }, [stableDispatch, newCardUploading, hasLoaded]);

  useEffect(() => {
    if (hasLoadedArmoryItems) {
      return;
    }
    stableDispatch(loadArmoryItems());
  }, [stableDispatch, hasLoadedArmoryItems]);

  if (!hasLoaded || !hasLoadedArmoryItems || newCardUploading) {
    return "Loading...";
  }

  const cards = [];

  Object.entries(playerCardData).map(([cardId, values]) => {
    if (values.armoryItems.length > 0) {
      let meleePoints = values[PlayerCardConstants.BASE_MELEE_POINTS];
      let rangedPoints = values[PlayerCardConstants.BASE_RANGED_POINTS];
      let diagonalPoints = values[PlayerCardConstants.BASE_DIAGONAL_POINTS];
      let defencePoints = values[PlayerCardConstants.BASE_DEFENCE_POINTS];
      let movementPoints = values[PlayerCardConstants.BASE_MOVEMENT_POINTS];

      values.armoryItems.map((itemId) => {
        const item = armoryItemsData.items[itemId];
        meleePoints = calculateStatusPoints(
          item,
          meleePoints,
          ArmoryItemConstants.MELEE_POINTS,
          ArmoryItemConstants.MELEE_OPERATOR
        );
        rangedPoints = calculateStatusPoints(
          item,
          rangedPoints,
          ArmoryItemConstants.RANGED_POINTS,
          ArmoryItemConstants.RANGED_OPERATOR
        );
        diagonalPoints = calculateStatusPoints(
          item,
          diagonalPoints,
          ArmoryItemConstants.DIAGONAL_POINTS,
          ArmoryItemConstants.DIAGONAL_OPERATOR
        );
        defencePoints = calculateStatusPoints(
          item,
          defencePoints,
          ArmoryItemConstants.DEFENCE_POINTS,
          ArmoryItemConstants.DEFENCE_OPERATOR
        );
        movementPoints = calculateStatusPoints(
          item,
          movementPoints,
          ArmoryItemConstants.MOVEMENT_POINTS,
          ArmoryItemConstants.MOVEMENT_OPERATOR
        );

        values[PlayerCardConstants.MELEE_POINTS] = meleePoints;
        values[PlayerCardConstants.RANGED_POINTS] = rangedPoints;
        values[PlayerCardConstants.DIAGONAL_POINTS] = diagonalPoints;
        values[PlayerCardConstants.DEFENCE_POINTS] = defencePoints;
        values[PlayerCardConstants.MOVEMENT_POINTS] = movementPoints;

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
