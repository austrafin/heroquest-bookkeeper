export const SET = "armoryItems/SET";

export function setArmoryItem(value, key, id) {
  return {
    type: SET,
    key: key,
    id: id,
    value: value,
  };
}
