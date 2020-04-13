import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { initialise } from "./actions/statusPoints";
import PlayerCard from "./PlayerCard";

function calculateStatusPoints(item, values, pointsKey, operatorKey) {
  let add = 0;
  if (item[pointsKey] > values[pointsKey] && item[operatorKey] === "=") {
    values[pointsKey] = item[pointsKey];
  } else if (item[operatorKey] === "+") {
    add += item[pointsKey];
  } else if (item[operatorKey] === "-") {
    add -= item[pointsKey];
  }

  values[pointsKey] += add;
}

const GamePage = (props) => {
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);
  const [hasLoaded, setLoaded] = useState(null);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const initialValues = {};
    const cardsArr = [];

    axios
      .get("http://localhost:5000/player_cards")
      .then((response) => {
        response.data.forEach((card) => {
          let image = "./no_image.webp";
          const values = {};
          values["bodyPoints"] = card.bodyPoints;
          values["mindPoints"] = card.mindPoints;
          values["meleePoints"] = card.baseMeleePoints;
          values["rangedPoints"] = card.baseRangedPoints;
          values["diagonalPoints"] = card.baseDiagonalPoints;
          values["defencePoints"] = card.baseDefencePoints;
          values["movementPoints"] = card.baseMovementPoints;
          values["gold"] = card.gold;
          values["armoryItems"] = card.armoryItems;

          card.armoryItems.forEach((item) => {
            calculateStatusPoints(item, values, "meleePoints", "meleeOperator");
            calculateStatusPoints(
              item,
              values,
              "rangedPoints",
              "rangedOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "diagonalPoints",
              "diagonalOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "defencePoints",
              "defenceOperator"
            );
            calculateStatusPoints(
              item,
              values,
              "movementPoints",
              "movementOperator"
            );
          });

          initialValues[card._id] = values;

          if (card.imagePath !== undefined) {
            const base64 = btoa(
              new Uint8Array(card.imageFile.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            image = "data:image/png;base64," + base64;
          }

          cardsArr.push(
            <Grid item xs key={card._id}>
              <PlayerCard
                imagePath={image}
                characterName={card.characterName}
                cardId={card._id}
              />
            </Grid>
          );
        });

        stableDispatch(initialise(initialValues));
        setLoaded(true);
        setCards(cardsArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [stableDispatch]);

  if (!hasLoaded) {
    return "Loading...";
  }

  return (
    <Grid container spacing={4}>
      {cards}
    </Grid>
  );
};

export default GamePage;
