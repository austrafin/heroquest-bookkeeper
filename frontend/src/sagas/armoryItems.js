import { takeLatest, put } from "redux-saga/effects";
import {
  ADD,
  DELETE,
  UPDATE,
  LOAD,
  initialiseArmoryItems,
  setArmoryItemsLoaded,
} from "../actions/armoryItems";
import {
  REDUX_STORE_FIELDS as Constants,
  DB_FIELDS as DB,
} from "../constants/armory_item.constants";
import { setCardsLoaded } from "../actions/playerCards";
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
  yield put(setArmoryItemsLoaded(false));
  const armoryItems = {};
  yield axios
    .get(process.env.REACT_APP_API_BASE_URL + "armory_items")
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
  yield put(initialiseArmoryItems(armoryItems));
  yield put(setArmoryItemsLoaded(true));
}

export function* addArmoryItem(action) {
  yield axios
    .post(
      process.env.REACT_APP_API_BASE_URL + "armory_items",
      mapReduxToDB(action.data)
    )
    .catch((error) => {
      console.log(error);
    });
  yield put(setArmoryItemsLoaded(false));
}

export function* updateDatabase(action) {
  yield axios
    .patch(
      process.env.REACT_APP_API_BASE_URL + "armory_items/" + action.id,
      mapReduxToDB(action.data)
    )
    .catch((error) => {
      console.log(error);
    });
  yield put(setArmoryItemsLoaded(false));
}

export function* deleteArmoryItem(action) {
  yield axios
    .delete(process.env.REACT_APP_API_BASE_URL + "armory_items/" + action.id)
    .catch((error) => {
      console.log(error);
    });
  yield put(setArmoryItemsLoaded(false));
  yield put(setCardsLoaded(false));
}

export const armoryItemSagas = [
  takeLatest(ADD, addArmoryItem),
  takeLatest(DELETE, deleteArmoryItem),
  takeLatest(LOAD, loadArmoryItems),
  takeLatest(UPDATE, updateDatabase),
];
