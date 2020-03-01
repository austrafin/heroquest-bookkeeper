export const SET = "inputValue/SET";

export function setInputValue(value, status) {
  return {
    type: SET,
    status: status,
    value: value
  };
}
