import { takeLatest, put } from "redux-saga/effects";
import {
  ADD,
  DELETE,
  UPDATE,
  INITIALISE,
  INITIALISE_AFTER,
  ARMORY_ITEMS_LOADED,
} from "../actions/armoryItems";
import {
  REDUX_STORE_FIELDS as Constants,
  DB_FIELDS as DB,
} from "../constants/armory_item.constants";
import { CARDS_LOADED } from "../actions/playerCards";
import axios from "axios";

function mapReduxToDB(values) {
  return {
    [DB.DEFENCE_OPERATOR]: values[Constants.DEFENCE_OPERATOR],
    [DB.DEFENCE_POINTS]: values[Constants.DEFENCE_POINTS],
    [DB.DIAGONAL_OPERATOR]: values[Constants.DIAGONAL_OPERATOR],
    [DB.DIAGONAL_POINTS]: values[Constants.DIAGONAL_POINTS],
    [DB.MELEE_OPERATOR]: values[Constants.MELEE_OPERATOR],
    [DB.MELEE_POINTS]: values[Constants.MELEE_POINTS],
    [DB.MOVEMENT_OPERATOR]: values[Constants.MOVEMENT_OPERATOR],
    [DB.MOVEMENT_POINTS]: values[Constants.MOVEMENT_POINTS],
    [DB.NAME]: values[Constants.NAME],
    [DB.RANGED_OPERATOR]: values[Constants.RANGED_OPERATOR],
    [DB.RANGED_POINTS]: values[Constants.RANGED_POINTS],
  };
}

export function* loadArmoryItems() {
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
  const armoryItems = {};
  yield axios
    .get("http://localhost:5000/armory_items")
    .then((response) => {
      response.data.forEach((item) => {
        const values = {};
        values[Constants.ID] = item[DB.ID];
        values[Constants.NAME] = item[DB.NAME];
        values[Constants.DEFENCE_OPERATOR] = item[DB.DEFENCE_OPERATOR];
        values[Constants.DEFENCE_POINTS] = item[DB.DEFENCE_POINTS];
        values[Constants.DIAGONAL_OPERATOR] = item[DB.DIAGONAL_OPERATOR];
        values[Constants.DIAGONAL_POINTS] = item[DB.DIAGONAL_POINTS];
        values[Constants.MELEE_OPERATOR] = item[DB.MELEE_OPERATOR];
        values[Constants.MELEE_POINTS] = item[DB.MELEE_POINTS];
        values[Constants.MOVEMENT_OPERATOR] = item[DB.MOVEMENT_OPERATOR];
        values[Constants.MOVEMENT_POINTS] = item[DB.MOVEMENT_POINTS];
        values[Constants.RANGED_OPERATOR] = item[DB.RANGED_OPERATOR];
        values[Constants.RANGED_POINTS] = item[DB.RANGED_POINTS];

        armoryItems[item[DB.ID]] = values;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: INITIALISE_AFTER, data: armoryItems });
  yield put({ type: ARMORY_ITEMS_LOADED, value: true });
}

export function* addArmoryItem(action) {
  yield axios
    .post("http://localhost:5000/armory_items/add", mapReduxToDB(action.data))
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
}

export function* updateDatabase(action) {
  yield axios
    .post(
      "http://localhost:5000/armory_items/update/" + action.id,
      mapReduxToDB(action.data)
    )
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
}

export function* deleteArmoryItem(action) {
  yield axios
    .delete("http://localhost:5000/armory_items/" + action.id)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
  yield put({ type: CARDS_LOADED, value: false });
}

export const armoryItemSagas = [
  takeLatest(ADD, addArmoryItem),
  takeLatest(DELETE, deleteArmoryItem),
  takeLatest(INITIALISE, loadArmoryItems),
  takeLatest(UPDATE, updateDatabase),
];
