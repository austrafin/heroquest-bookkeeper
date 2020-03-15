export const SET = "inputValue/SET";

export function setInputValue(value, status, cardId) {
  return {
    type: SET,
    status: status,
    value: value,
    cardId: cardId
  };
}
