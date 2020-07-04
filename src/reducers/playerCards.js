import {
  ADD,
  ADD_AFTER,
  CARDS_LOADED,
  SET_VALUE,
  INCREMENT,
  DECREMENT,
  INITIALISE,
  SET_SELECTED_IMAGE,
  UPDATE_BASE_VALUES,
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
    case SET_VALUE:
      if (action.cardId in state.cardData) {
        return {
          ...state,
          cardData: {
            ...state.cardData,
            [action.cardId]: {
              ...state.cardData[action.cardId],
              [action.label]: action.value,
            },
          },
        };
      }
      return state;
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
      return { ...state, cardsLoaded: action.value };
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
    case UPDATE_BASE_VALUES:
      console.log(action);
      return {
        ...state,
        cardData: {
          ...state.cardData,
          [action.cardId]: {
            ...state.cardData[action.cardId],
            baseBodyPoints: action.values.baseBodyPoints,
            baseMindPoints: action.values.baseMindPoints,
            baseMeleePoints: action.values.baseMeleePoints,
            baseRangedPoints: action.values.baseRangedPoints,
            baseDiagonalPoints: action.values.baseDiagonalPoints,
            baseDefencePoints: action.values.baseDefencePoints,
            baseMovementPoints: action.values.baseMovementPoints,
          },
        },
      };
    default:
      return state;
  }
};
