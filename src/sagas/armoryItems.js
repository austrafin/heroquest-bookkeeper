import { takeLatest, delay, put } from "redux-saga/effects";
import {
  UPDATE,
  INITIALISE,
  INITIALISE_AFTER,
  ARMORY_ITEMS_LOADED,
  updateArmoryItemAfter,
} from "../actions/armoryItems";
import axios from "axios";
import store from "../store";

function* loadArmoryItems() {
  const armoryArr = [];
  yield axios
    .get("http://localhost:5000/armory_items")
    .then((response) => {
      response.data.forEach((item) => {
        armoryArr.push(item);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: INITIALISE_AFTER, data: armoryArr });
  yield put({ type: ARMORY_ITEMS_LOADED });
}

function* updateDatabase(action) {
  yield delay(1000);
  yield axios
    .post(
      "http://localhost:5000/armory_items/update/" + action.id,
      store.getState().armoryItems[action.id]
    )
    .catch((error) => {
      console.log(error);
    });
  yield put(updateArmoryItemAfter(action.id));
}

export const armoryItemSagas = [
  takeLatest(INITIALISE, loadArmoryItems),
  takeLatest(UPDATE, updateDatabase),
];
