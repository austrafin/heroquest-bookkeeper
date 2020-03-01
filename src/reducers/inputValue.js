function inputValueReducer(state, action) {
  return {
    ...state,
    [action.status]: action.value
  };
}

export default inputValueReducer;
