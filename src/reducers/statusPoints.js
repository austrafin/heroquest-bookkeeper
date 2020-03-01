import { INCREMENT, DECREMENT } from "../actions/statusPoints";

function statusPointsReducer(state = {}, action) {
  switch (action.type) {
    case INCREMENT:
      if ([action.label] in state) {
        return {
          ...state,
          [action.label]: state[[action.label]] + action.incrementValue
        };
      }
      return {
        ...state,
        [action.label]: 0 + action.incrementValue
      };
    case DECREMENT:
      if ([action.label] in state) {
        return {
          ...state,
          [action.label]: state[[action.label]] - action.incrementValue
        };
      }
      return {
        ...state,
        [action.label]: 0 - action.incrementValue
      };
  }

  return state;
}

export default statusPointsReducer;
