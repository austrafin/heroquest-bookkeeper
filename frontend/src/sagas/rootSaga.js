import { all } from "redux-saga/effects";
import { armoryItemSagas } from "./armoryItems";
import { playerCardsSagas } from "./playerCards";

export function* rootSaga() {
  yield all([...armoryItemSagas, ...playerCardsSagas]);
}
