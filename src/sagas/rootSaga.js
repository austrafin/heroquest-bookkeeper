import { all } from "redux-saga/effects";
import { statusPointSagas } from "./statusPoints";
import { armoryItemSagas } from "./armoryItems";

export function* rootSaga() {
  yield all([...statusPointSagas, ...armoryItemSagas]);
}
