import { ADD, ADD_AFTER } from "../actions/playerCards";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, newCardUploading: true };
    case ADD_AFTER:
      return { ...state, newCardUploading: false };
    default:
      return state;
  }
};
