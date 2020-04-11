export const SET = "armoryItems/SET";
export const UPDATE = "armoryItems/UPDATE";

export function setArmoryItem(value, key, id) {
  return {
    type: SET,
    key: key,
    id: id,
    value: value,
  };
}

export function updateArmoryItem(id) {
  return {
    type: UPDATE,
    id: id,
  };
}
