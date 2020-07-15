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
  CLEAR_PENDING_CHANGES,
} from "../actions/playerCards";
import {
  REDUX_STORE_FIELDS as Constants,
  DB_FIELDS as DB,
  ALT_IMAGE_PATH,
} from "../constants/player_card.constants";
import axios from "axios";
import store from "../store";

function mapBaseValuesReduxToDB(values) {
  return {
    [DB.CHARACTER_NAME]: values[Constants.CHARACTER_NAME],
    [DB.BASE_BODY_POINTS]: values[Constants.BASE_BODY_POINTS],
    [DB.BASE_MIND_POINTS]: values[Constants.BASE_MIND_POINTS],
    [DB.BASE_DIAGONAL_POINTS]: values[Constants.BASE_DIAGONAL_POINTS],
    [DB.BASE_MELEE_POINTS]: values[Constants.BASE_MELEE_POINTS],
    [DB.BASE_RANGED_POINTS]: values[Constants.BASE_RANGED_POINTS],
    [DB.BASE_DEFENCE_POINTS]: values[Constants.BASE_DEFENCE_POINTS],
    [DB.BASE_MOVEMENT_POINTS]: values[Constants.BASE_MOVEMENT_POINTS],
  };
}

export function* loadPlayerCardData() {
  yield put({ type: CARDS_LOADED, value: false });
  const initialValues = {};

  yield axios
    .get("http://localhost:5000/player_cards")
    .then((response) => {
      if (response.status === 200) {
        response.data.forEach((card) => {
          const values = {};
          values[Constants.CHARACTER_NAME] = card[DB.CHARACTER_NAME];
          values[Constants.BASE_BODY_POINTS] = card[DB.BASE_BODY_POINTS];
          values[Constants.BODY_POINTS] = card[DB.BODY_POINTS];
          values[Constants.BASE_MIND_POINTS] = card[DB.BASE_MIND_POINTS];
          values[Constants.MIND_POINTS] = card[DB.MIND_POINTS];
          values[Constants.BASE_MELEE_POINTS] = card[DB.BASE_MELEE_POINTS];
          values[Constants.MELEE_POINTS] = card[DB.BASE_MELEE_POINTS];
          values[Constants.BASE_RANGED_POINTS] = card[DB.BASE_RANGED_POINTS];
          values[Constants.RANGED_POINTS] = card[DB.BASE_RANGED_POINTS];
          values[Constants.BASE_DIAGONAL_POINTS] =
            card[DB.BASE_DIAGONAL_POINTS];
          values[Constants.DIAGONAL_POINTS] = card[DB.BASE_DIAGONAL_POINTS];
          values[Constants.BASE_DEFENCE_POINTS] = card[DB.BASE_DEFENCE_POINTS];
          values[Constants.DEFENCE_POINTS] = card[DB.BASE_DEFENCE_POINTS];
          values[Constants.BASE_MOVEMENT_POINTS] =
            card[DB.BASE_MOVEMENT_POINTS];
          values[Constants.MOVEMENT_POINTS] = card[DB.BASE_MOVEMENT_POINTS];
          values[Constants.GOLD] = card[DB.GOLD];
          values[Constants.ARMORY_ITEMS] = card[DB.ARMORY_ITEMS];

          if (card[DB.IMAGE] !== undefined) {
            const base64 = btoa(
              new Uint8Array(card[DB.IMAGE].data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );

            values[Constants.IMAGE] = "data:image/png;base64," + base64;
          } else {
            values[Constants.IMAGE] = ALT_IMAGE_PATH;
          }

          initialValues[card[DB.ID]] = values;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: INITIALISE, data: initialValues });
  yield put({ type: CARDS_LOADED, value: true });
}

export function* addPlayerCard(action) {
  yield put({ type: CARDS_LOADED, value: false });
  yield axios
    .post(
      "http://localhost:5000/player_cards/add",
      mapBaseValuesReduxToDB(action.values)
    )
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ADD_AFTER });
  yield put({ type: CARDS_LOADED, value: true });
}

export function* deletePlayerCard(action) {
  yield put({ type: CARDS_LOADED, value: false });
  yield axios
    .delete("http://localhost:5000/player_cards/" + action.cardId)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: DELETE_AFTER, cardId: action.cardId });
  yield put({ type: CARDS_LOADED, value: true });
}

export function* addArmoryItem(action) {
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

export function* updateDatabase() {
  yield delay(200);

  const pendingChanges = store.getState().playerCards.pendingChanges;
  const updateValues = {};

  Object.entries(pendingChanges).map(([key, value]) => {
    updateValues[key] = {};

    if (Constants.BODY_POINTS in pendingChanges[key])
      updateValues[key][DB.BODY_POINTS] =
        pendingChanges[key][Constants.BODY_POINTS];
    if (Constants.MIND_POINTS in pendingChanges[key])
      updateValues[key][DB.MIND_POINTS] =
        pendingChanges[key][Constants.MIND_POINTS];
    if (Constants.GOLD in pendingChanges[key])
      updateValues[key][DB.GOLD] = pendingChanges[key][Constants.GOLD];
    return updateValues;
  });

  yield axios
    .post("http://localhost:5000/player_cards/update", updateValues)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: CLEAR_PENDING_CHANGES });
}

export function* updateBaseValues(action) {
  yield delay(200);
  yield axios
    .post("http://localhost:5000/player_cards/update", {
      [action.cardId]: mapBaseValuesReduxToDB(action.values),
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: CARDS_LOADED, value: false });
}

export function* uploadImage(action) {
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
