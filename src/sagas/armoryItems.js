import { takeLatest, delay, put } from "redux-saga/effects";
import {
  UPDATE,
  UPDATE_AFTER,
  updateArmoryItemAfter,
} from "../actions/armoryItems";
import axios from "axios";
import store from "../store";

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

export const armoryItemSagas = [takeLatest(UPDATE, updateDatabase)];
