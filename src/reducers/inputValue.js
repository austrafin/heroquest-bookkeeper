const initialValue = {
  body: 1,
  mind: 1,
  gold: 25
};

function inputValueReducer(state = initialValue, action) {
  switch (action.status) {
    case "body":
      return {
        ...state,
        body: action.value
      };
    case "mind":
      return {
        ...state,
        mind: action.value
      };
    case "gold":
      return {
        ...state,
        gold: action.value
      };
  }

  return state;
}

export default inputValueReducer;
