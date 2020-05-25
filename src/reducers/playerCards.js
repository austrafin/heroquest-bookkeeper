import {
  ADD,
  ADD_AFTER,
  CARDS_LOADED,
  INCREMENT,
  DECREMENT,
  INITIALISE,
  SET_SELECTED_IMAGE,
} from "../actions/playerCards";

function difference(state, action, decrement) {
  let incrementValue = action.incrementValue;

  if (decrement) {
    incrementValue *= -1;
  }

  if (action.cardId in state.cardData) {
    return {
      ...state,
      cardData: {
        ...state.cardData,
        [action.cardId]: {
          ...state.cardData[action.cardId],
          [action.label]:
            state.cardData[action.cardId][action.label] + incrementValue,
        },
      },
    };
  }
  return {
    ...state,
    cardData: {
      ...state.cardData,
      [action.cardId]: {
        ...state.cardData[action.cardId],
        [action.label]: 0 + incrementValue,
      },
    },
  };
}

export default (state = {}, action) => {
  switch (action.type) {
    case INCREMENT:
      return difference(state, action, false);
    case DECREMENT:
      return difference(state, action, true);
    case INITIALISE:
      return {
        ...state,
        cardData: {
          ...action.data,
        },
      };
    case ADD:
      return { ...state, newCardUploading: true };
    case ADD_AFTER:
      return { ...state, newCardUploading: false };
    case CARDS_LOADED:
      return { ...state, cardsLoaded: true };
    case SET_SELECTED_IMAGE:
      return {
        ...state,
        cardData: {
          ...state.cardData,
          [action.cardId]: {
            ...state.cardData[action.cardId],
            selectedImageFile: action.selectedFile,
          },
        },
      };
    default:
      return state;
  }
};
