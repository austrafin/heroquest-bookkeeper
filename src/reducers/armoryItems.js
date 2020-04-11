import { SET, UPDATE } from "../actions/armoryItems";

function armoryItemsReducer(state = {}, action) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.key]: action.value,
        },
      };
    case UPDATE:
      return Object.keys(state)
        .filter((key) => key !== action.id)
        .reduce((result, current) => {
          result[current] = state[current];
          return result;
        }, {});
    default:
      return state;
  }
}

export default armoryItemsReducer;
