import { takeLatest, put } from "redux-saga/effects";
import { ADD, ADD_AFTER, LOAD, CARDS_LOADED } from "../actions/playerCards";
import axios from "axios";
import { initialise } from "../actions/playerCardData";

const calculateStatusPoints = (item, values, pointsKey, operatorKey) => {
  let add = 0;
  if (item[pointsKey] > values[pointsKey] && item[operatorKey] === "=") {
    values[pointsKey] = item[pointsKey];
  } else if (item[operatorKey] === "+") {
    add += item[pointsKey];
  } else if (item[operatorKey] === "-") {
    add -= item[pointsKey];
  }

  values[pointsKey] += add;
};

function* loadPlayerCardData() {
  const initialValues = {};

  yield axios
    .get("http://localhost:5000/player_cards")
    .then((response) => {
      response.data.forEach((card) => {
        const values = {};
        values["characterName"] = card.characterName;
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
          calculateStatusPoints(item, values, "rangedPoints", "rangedOperator");
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

        if (card.imageFile !== undefined) {
          const base64 = btoa(
            new Uint8Array(card.imageFile.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );

          values["image"] = "data:image/png;base64," + base64;
        } else {
          values["image"] = "./no_image.webp";
        }

        initialValues[card._id] = values;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  yield put(initialise(initialValues));
  yield put({ type: CARDS_LOADED });
}

function* addPlayerCard(action) {
  yield axios
    .post("http://localhost:5000/player_cards/add", action.values)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ADD_AFTER });
}

export const playerCardsSagas = [
  takeLatest(ADD, addPlayerCard),
  takeLatest(LOAD, loadPlayerCardData),
];
