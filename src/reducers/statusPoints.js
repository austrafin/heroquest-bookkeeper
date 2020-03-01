import { INCREMENT, DECREMENT } from "../actions/statusPoints";
const initialValue = {
  body: 0,
  mind: 0,
  gold: 0
};

function statusPointsReducer(state = initialValue, action) {
  switch (action.type) {
    case INCREMENT:
      switch (action.label) {
        case "body":
          return {
            ...state,
            body: state.body + action.incrementValue
          };
        case "mind":
          return {
            ...state,
            mind: state.mind + action.incrementValue
          };
        case "gold":
          return {
            ...state,
            gold: state.gold + action.incrementValue
          };
      }
    case DECREMENT:
      switch (action.label) {
        case "body":
          return {
            ...state,
            body: state.body - action.incrementValue
          };
        case "mind":
          return {
            ...state,
            mind: state.mind - action.incrementValue
          };
        case "gold":
          return {
            ...state,
            gold: state.gold - action.incrementValue
          };
      }
  }

  return state;
}

export default statusPointsReducer;
