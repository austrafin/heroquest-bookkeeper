export const ADD = "playerCards/ADD";
export const ADD_AFTER = "playerCards/ADD_AFTER";

export function addPlayerCard(values) {
  return {
    type: ADD,
    values: values,
  };
}
