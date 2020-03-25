import { takeLatest, delay, all } from "redux-saga/effects";
import { INCREMENT, DECREMENT } from "../actions/statusPoints";
import axios from "axios";
import store from "../store";

function* updateDatabase() {
  yield delay(1000);
  yield axios
    .post(
      "http://localhost:5000/player_cards/update",
      store.getState().statusPoints
    )
    .catch(error => {
      console.log(error);
    });
}

export function* rootSaga() {
  yield all([
    takeLatest(INCREMENT, updateDatabase),
    takeLatest(DECREMENT, updateDatabase)
  ]);
}