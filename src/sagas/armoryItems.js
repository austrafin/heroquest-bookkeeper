import { takeLatest, delay, put } from "redux-saga/effects";
import {
  UPDATE,
  INITIALISE,
  INITIALISE_AFTER,
  ARMORY_ITEMS_LOADED,
} from "../actions/armoryItems";
import axios from "axios";

function* loadArmoryItems() {
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
  const armoryArr = {};
  yield axios
    .get("http://localhost:5000/armory_items")
    .then((response) => {
      response.data.forEach((item) => {
        armoryArr[item._id] = item;
      });
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: INITIALISE_AFTER, data: armoryArr });
  yield put({ type: ARMORY_ITEMS_LOADED, value: true });
}

function* updateDatabase(action) {
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
  yield delay(1000);
  yield axios
    .post("http://localhost:5000/armory_items/update/" + action.id, action.data)
    .catch((error) => {
      console.log(error);
    });
}

export const armoryItemSagas = [
  takeLatest(INITIALISE, loadArmoryItems),
  takeLatest(UPDATE, updateDatabase),
];
