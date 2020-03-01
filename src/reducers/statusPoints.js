import { INCREMENT, DECREMENT } from "../actions/statusPoints";
const initialValue = {
  body: 0,
  mind: 0,
  gold: 0
};

function statusPointsReducer(state = initialValue, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        [action.label]: state[[action.label]] + action.incrementValue
      };
    case DECREMENT:
      return {
        ...state,
        [action.label]: state[[action.label]] - action.incrementValue
      };
  }

  return state;
}

export default statusPointsReducer;
