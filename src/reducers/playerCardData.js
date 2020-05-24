import { INCREMENT, DECREMENT, INITIALISE } from "../actions/playerCardData";

function statusPointsReducer(state = {}, action) {
  switch (action.type) {
    case INCREMENT:
      if (action.cardId in state) {
        return {
          ...state,
          [action.cardId]: {
            ...state[action.cardId],
            [action.label]:
              state[action.cardId][action.label] + action.incrementValue,
          },
        };
      }
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          [action.label]: 0 + action.incrementValue,
        },
      };
    case DECREMENT:
      if (action.cardId in state) {
        return {
          ...state,
          [action.cardId]: {
            ...state[action.cardId],
            [action.label]:
              state[action.cardId][action.label] - action.incrementValue,
          },
        };
      }
      return {
        ...state,
        [action.cardId]: {
          ...state[action.cardId],
          [action.label]: 0 - action.incrementValue,
        },
      };
    case INITIALISE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}

export default statusPointsReducer;
