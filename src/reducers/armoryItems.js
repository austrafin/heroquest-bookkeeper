import { SET } from "../actions/armoryItems";

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
    default:
      return state;
  }
}

export default armoryItemsReducer;
