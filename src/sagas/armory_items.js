import { takeLatest, delay, all } from "redux-saga/effects";
import { INCREMENT, DECREMENT } from "../actions/statusPoints";
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

export const aromryItemSagas = [takeLatest(INCREMENT, updateDatabase)];
