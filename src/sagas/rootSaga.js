import { all } from "redux-saga/effects";
import { statusPointSagas } from "./statusPoints";

export function* rootSaga() {
  yield all([...statusPointSagas]);
}
