import { ADD, ADD_AFTER, CARDS_LOADED } from "../actions/playerCards";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, newCardUploading: true };
    case ADD_AFTER:
      return { ...state, newCardUploading: false };
    case CARDS_LOADED:
      return { ...state, cardsLoaded: true };
    default:
      return state;
  }
};
