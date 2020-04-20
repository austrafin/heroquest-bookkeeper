import { takeLatest, put } from "redux-saga/effects";
import { ADD, ADD_AFTER } from "../actions/playerCards";
import axios from "axios";

function* addPlayerCard(action) {
  yield axios
    .post("http://localhost:5000/player_cards/add", action.values)
    .catch((error) => {
      console.log(error);
    });
  yield put({ type: ADD_AFTER });
}

export const playerCardsSagas = [takeLatest(ADD, addPlayerCard)];
