import { ARMORY_ITEMS_LOADED, INITIALISE } from "../actions/armoryItems";

function armoryItemsReducer(state = {}, action) {
  switch (action.type) {
    case INITIALISE:
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
