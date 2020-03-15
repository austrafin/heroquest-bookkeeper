function inputValueReducer(state = {}, action) {
  if (action.cardId !== undefined) {
    return {
      ...state,
      [action.cardId]: {
        ...state[action.cardId],
        [action.status]: action.value
      }
    };
  }
  return state;
}

export default inputValueReducer;
