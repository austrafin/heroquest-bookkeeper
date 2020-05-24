export const INCREMENT = "statusPoints/INCREMENT";
export const DECREMENT = "statusPoints/DECREMENT";
export const INITIALISE = "statusPoints/INITIALISE";

export function initialise(data) {
  return {
    type: INITIALISE,
    data: data,
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
