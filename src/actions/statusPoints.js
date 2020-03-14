export const INCREMENT = "statusPoints/INCREMENT";
export const DECREMENT = "statusPoints/DECREMENT";
export const INITIALISE = "statusPoints/INITIALISE";

export function initialise(data) {
  return {
    type: INITIALISE,
    data: data
  };
}

export function increment(value, label) {
  return {
    type: INCREMENT,
    incrementValue: value,
    label: label
  };
}

export function decrement(value, label) {
  return {
    type: DECREMENT,
    incrementValue: value,
    label: label
  };
}
