import { takeLatest, delay } from "redux-saga/effects";
import axios from "axios";
import store from "../store";

function* updateDatabase() {
  yield delay(1000);
  yield axios
    .post(
      "http://localhost:5000/armory_items/update",
      store.getState().statusPoints
    )
    .catch((error) => {
      console.log(error);
    });
}

export const armoryItemSagas = [takeLatest(INCREMENT, updateDatabase)];
