import { all } from "redux-saga/effects";
import { statusPointSagas } from "./statusPoints";
import { armoryItemSagas } from "./armoryItems";
import { playerCardsSagas } from "./playerCards";

export function* rootSaga() {
  yield all([...statusPointSagas, ...armoryItemSagas, ...playerCardsSagas]);
}
