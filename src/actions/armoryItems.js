export const SET = "armoryItems/SET";
export const UPDATE = "armoryItems/UPDATE";
export const UPDATE_AFTER = "armoryItems/UPDATE_AFTER";
export const ARMORY_ITEMS_LOADED = "armoryItems/ARMORY_ITEMS_LOADED";
export const INITIALISE = "armoryItems/INITIALISE";
export const INITIALISE_AFTER = "armoryItems/INITIALISE_AFTER";

export function initialiseArmoryItems() {
  return {
    type: INITIALISE,
  };
}

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
