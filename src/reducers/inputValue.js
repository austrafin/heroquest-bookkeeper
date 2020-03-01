const initialValue = {
  body: 1,
  mind: 1,
  gold: 25
};

function inputValueReducer(state = initialValue, action) {
  return {
    ...state,
    [action.status]: action.value
  };
}

export default inputValueReducer;
