export const SET = "armoryItems/SET";
export const UPDATE = "armoryItems/UPDATE";
export const UPDATE_AFTER = "armoryItems/UPDATE_AFTER";

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

export function updateArmoryItemAfter(id) {
  return {
    type: UPDATE_AFTER,
    id: id,
  };
}
