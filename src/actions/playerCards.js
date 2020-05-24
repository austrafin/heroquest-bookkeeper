export const ADD = "playerCards/ADD";
export const ADD_AFTER = "playerCards/ADD_AFTER";
export const LOAD = "playerCards/LOAD";
export const CARDS_LOADED = "playerCards/CARDS_LOADED";

export function addPlayerCard(values) {
  return {
    type: ADD,
    values: values,
  };
}

export function loadPlayerCards() {
  return {
    type: LOAD,
  };
}
