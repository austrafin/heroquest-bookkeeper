import { takeLatest, put } from "redux-saga/effects";
import {
  ADD,
  DELETE,
  UPDATE,
  INITIALISE,
  INITIALISE_AFTER,
  ARMORY_ITEMS_LOADED,
} from "../actions/armoryItems";
import { CARDS_LOADED } from "../actions/playerCards";
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

function* addArmoryItem(action) {
  yield axios
    .post("http://localhost:5000/armory_items/add", action.data)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
}

function* updateDatabase(action) {
  yield axios
    .post("http://localhost:5000/armory_items/update/" + action.id, action.data)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ARMORY_ITEMS_LOADED, value: false });
}

function* deleteArmoryItem(action) {
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
