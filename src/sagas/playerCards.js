import { takeLatest, put, delay } from "redux-saga/effects";
import {
  ADD,
  ADD_AFTER,
  DELETE,
  DELETE_AFTER,
  LOAD,
  CARDS_LOADED,
  INITIALISE,
  INCREMENT,
  DECREMENT,
  UPLOAD_IMAGE,
  SET_SELECTED_IMAGE,
  ADD_ARMORY_ITEM,
  UPDATE_BASE_VALUES,
} from "../actions/playerCards";
import * as Constants from "../constants/player_card.constants";
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
          values[Constants.CHARACTER_NAME] = card.characterName;
          values[Constants.BASE_BODY_POINTS] = card.baseBodyPoints;
          values[Constants.BODY_POINTS] = card.bodyPoints;
          values[Constants.BASE_MIND_POINTS] = card.baseMindPoints;
          values[Constants.MIND_POINTS] = card.mindPoints;
          values[Constants.BASE_MELEE_POINTS] = card.baseMeleePoints;
          values[Constants.MELEE_POINTS] = card.baseMeleePoints;
          values[Constants.BASE_RANGED_POINTS] = card.baseRangedPoints;
          values[Constants.RANGED_POINTS] = card.baseRangedPoints;
          values[Constants.BASE_DIAGONAL_POINTS] = card.baseDiagonalPoints;
          values[Constants.DIAGONAL_POINTS] = card.baseDiagonalPoints;
          values[Constants.BASE_DEFENCE_POINTS] = card.baseDefencePoints;
          values[Constants.DEFENCE_POINTS] = card.baseDefencePoints;
          values[Constants.BASE_MOVEMENT_POINTS] = card.baseMovementPoints;
          values[Constants.MOVEMENT_POINTS] = card.baseMovementPoints;
          values[Constants.GOLD] = card.gold;
          values[Constants.ARMORY_ITEMS] = card.armoryItems;

          if (card.imageFile !== undefined) {
            const base64 = btoa(
              new Uint8Array(card.imageFile.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            values[Constants.IMAGE] = "data:image/png;base64," + base64;
          } else {
            values[Constants.IMAGE] = Constants.ALT_IMAGE_PATH;
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

function* deletePlayerCard(action) {
  yield put({ type: CARDS_LOADED, value: false });
  yield axios
    .delete("http://localhost:5000/player_cards/" + action.cardId)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: DELETE_AFTER, cardId: action.cardId });
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
  yield delay(1000);
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

function* updateBaseValues(action) {
  yield delay(200);
  yield axios
    .post("http://localhost:5000/player_cards/update", {
      [action.cardId]: {
        baseBodyPoints: action.values[Constants.BASE_BODY_POINTS],
        baseMindPoints: action.values[Constants.BASE_MIND_POINTS],
        baseMeleePoints: action.values[Constants.BASE_MELEE_POINTS],
        baseRangedPoints: action.values[Constants.BASE_RANGED_POINTS],
        baseDiagonalPoints: action.values[Constants.BASE_DIAGONAL_POINTS],
        baseDefencePoints: action.values[Constants.BASE_DEFENCE_POINTS],
        baseMovementPoints: action.values[Constants.BASE_MOVEMENT_POINTS],
      },
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: CARDS_LOADED, value: false });
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
  takeLatest(DELETE, deletePlayerCard),
  takeLatest(INCREMENT, updateDatabase),
  takeLatest(DECREMENT, updateDatabase),
  takeLatest(UPDATE_BASE_VALUES, updateBaseValues),
  takeLatest(UPLOAD_IMAGE, uploadImage),
  takeLatest(ADD_ARMORY_ITEM, addArmoryItem),
];
