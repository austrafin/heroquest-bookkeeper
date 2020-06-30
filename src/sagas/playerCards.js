import { takeLatest, put, delay } from "redux-saga/effects";
import {
  ADD,
  ADD_AFTER,
  LOAD,
  CARDS_LOADED,
  INITIALISE,
  INCREMENT,
  DECREMENT,
  UPLOAD_IMAGE,
  SET_SELECTED_IMAGE,
  ADD_ARMORY_ITEM,
} from "../actions/playerCards";
import axios from "axios";
import store from "../store";

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
      if (response.status === 200) {
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
      }
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: INITIALISE, data: initialValues });
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

function* addArmoryItem(action) {
  const body = { itemId: action.itemId };
  yield axios
    .post(
      "http://localhost:5000/player_cards/add_armory_item/" + action.cardId,
      body
    )
    .catch((error) => {
      console.log(error);
    });
}

function* updateDatabase(action) {
  yield delay(200);
  yield axios
    .post("http://localhost:5000/player_cards/update", {
      [action.cardId]: {
        [action.label]: store.getState().playerCards.cardData[action.cardId][
          action.label
        ],
      },
    })
    .catch((error) => {
      console.log(error);
    });
}

function* uploadImage(action) {
  if (action.selectedFile !== null) {
    const formData = new FormData();
    formData.append(
      "characterImage",
      action.selectedFile,
      action.selectedFile.name
    );
    try {
      let responseStatus = null;

      yield axios
        .post(
          "http://localhost:5000/player_cards/upload_image/" + action.cardId,
          formData
        )
        .then((response) => {
          responseStatus = response.status;
        });
      if (responseStatus === 200) {
        yield put({
          type: SET_SELECTED_IMAGE,
          selectedFile: null,
          cardId: action.cardId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const playerCardsSagas = [
  takeLatest(ADD, addPlayerCard),
  takeLatest(LOAD, loadPlayerCardData),
  takeLatest(INCREMENT, updateDatabase),
  takeLatest(DECREMENT, updateDatabase),
  takeLatest(UPLOAD_IMAGE, uploadImage),
  takeLatest(ADD_ARMORY_ITEM, addArmoryItem),
];
