export const ADD = "playerCards/ADD";
export const ADD_AFTER = "playerCards/ADD_AFTER";
export const LOAD = "playerCards/LOAD";
export const CARDS_LOADED = "playerCards/CARDS_LOADED";
export const INCREMENT = "playerCards/INCREMENT";
export const DECREMENT = "playerCards/DECREMENT";
export const INITIALISE = "playerCards/INITIALISE";

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

export function increment(value, label, cardId) {
  return {
    type: INCREMENT,
    incrementValue: value,
    label: label,
    cardId: cardId,
  };
}

export function decrement(value, label, cardId) {
  return {
    type: DECREMENT,
    incrementValue: value,
    label: label,
    cardId: cardId,
  };
}
