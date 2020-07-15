import {
  ADD,
  ADD_AFTER,
  DELETE_AFTER,
  CARDS_LOADED,
  SET_VALUE,
  INCREMENT,
  DECREMENT,
  INITIALISE,
  SET_SELECTED_IMAGE,
  UPDATE_BASE_VALUES,
  CLEAR_PENDING_CHANGES,
} from "../actions/playerCards";
import { REDUX_STORE_FIELDS as Constants } from "../constants/player_card.constants";

function difference(state, action, decrement) {
  const newState = { ...state };
  const newValue = decrement
    ? newState.cardData[action.cardId][action.label] - action.incrementValue
    : newState.cardData[action.cardId][action.label] + action.incrementValue;

  if (!(action.cardId in newState.pendingChanges))
    newState.pendingChanges[action.cardId] = {};

  return {
    ...newState,
    cardData: {
      ...newState.cardData,
      [action.cardId]: {
        ...newState.cardData[action.cardId],
        [action.label]: newValue,
      },
    },
    pendingChanges: {
      ...newState.pendingChanges,
      [action.cardId]: {
        ...newState.pendingChanges[action.cardId],
        [action.label]: newValue,
      },
    },
  };
}

export default (state = { pendingChanges: {} }, action) => {
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
    case DELETE_AFTER:
      const newState = { ...state };
      delete newState.cardData[action.cardId];
      return newState;
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
      return {
        ...state,
        cardData: {
          ...state.cardData,
          [action.cardId]: {
            ...state.cardData[action.cardId],
            [Constants.BASE_BODY_POINTS]:
              action.values[Constants.BASE_BODY_POINTS],
            [Constants.BASE_MIND_POINTS]:
              action.values[Constants.BASE_MIND_POINTS],
            [Constants.BASE_MELEE_POINTS]:
              action.values[Constants.BASE_MELEE_POINTS],
            [Constants.BASE_RANGED_POINTS]:
              action.values[Constants.BASE_RANGED_POINTS],
            [Constants.BASE_DIAGONAL_POINTS]:
              action.values[Constants.BASE_DIAGONAL_POINTS],
            [Constants.BASE_DEFENCE_POINTS]:
              action.values[Constants.BASE_DEFENCE_POINTS],
            [Constants.BASE_MOVEMENT_POINTS]:
              action.values[Constants.BASE_MOVEMENT_POINTS],
          },
        },
      };
    case CLEAR_PENDING_CHANGES:
      return {
        ...state,
        pendingChanges: {},
      };
    default:
      return state;
  }
};
