import { ARMORY_ITEMS_LOADED, INITIALISE_AFTER } from "../actions/armoryItems";

function armoryItemsReducer(state = {}, action) {
  switch (action.type) {
    case INITIALISE_AFTER:
      return {
        ...state,
        items: action.data,
      };
    case ARMORY_ITEMS_LOADED:
      return { ...state, armoryItemsLoaded: action.value };
    default:
      return state;
  }
}

export default armoryItemsReducer;
