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

function* loadPlayerCardData() {
  yield put({ type: CARDS_LOADED, value: false });
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
          values["baseMeleePoints"] = card.baseMeleePoints;
          values["meleePoints"] = card.baseMeleePoints;
          values["baseRangedPoints"] = card.baseRangedPoints;
          values["rangedPoints"] = card.baseRangedPoints;
          values["baseDiagonalPoints"] = card.baseDiagonalPoints;
          values["diagonalPoints"] = card.baseDiagonalPoints;
          values["baseDefencePoints"] = card.baseDefencePoints;
          values["defencePoints"] = card.baseDefencePoints;
          values["baseMovementPoints"] = card.baseMovementPoints;
          values["movementPoints"] = card.baseMovementPoints;
          values["gold"] = card.gold;
          values["armoryItems"] = card.armoryItems;

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
  yield put({ type: CARDS_LOADED, value: true });
}

function* addPlayerCard(action) {
  yield put({ type: CARDS_LOADED, value: false });
  yield axios
    .post("http://localhost:5000/player_cards/add", action.values)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ADD_AFTER });
  yield put({ type: CARDS_LOADED, value: true });
}

function* addArmoryItem(action) {
  const body = { itemId: action.itemId };
  try {
    let responseStatus = null;

    yield axios
      .post(
        "http://localhost:5000/player_cards/add_armory_item/" + action.cardId,
        body
      )
      .then((response) => {
        responseStatus = response.status;
      });

    if (responseStatus === 200) {
      yield put({ type: LOAD });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateDatabase(action) {
  yield put({ type: CARDS_LOADED, value: false });
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
  yield put({ type: CARDS_LOADED, value: true });
}

function* uploadImage(action) {
  yield put({ type: CARDS_LOADED, value: false });
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
  yield put({ type: CARDS_LOADED, value: true });
}

export const playerCardsSagas = [
  takeLatest(ADD, addPlayerCard),
  takeLatest(LOAD, loadPlayerCardData),
  takeLatest(INCREMENT, updateDatabase),
  takeLatest(DECREMENT, updateDatabase),
  takeLatest(UPLOAD_IMAGE, uploadImage),
  takeLatest(ADD_ARMORY_ITEM, addArmoryItem),
];
