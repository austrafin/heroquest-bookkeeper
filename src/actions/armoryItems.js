export const ADD = "armoryItems/ADD";
export const DELETE = "armoryItems/DELETE";
export const UPDATE = "armoryItems/UPDATE";
export const ARMORY_ITEMS_LOADED = "armoryItems/ARMORY_ITEMS_LOADED";
export const INITIALISE = "armoryItems/INITIALISE";
export const INITIALISE_AFTER = "armoryItems/INITIALISE_AFTER";

export function addArmoryItem(data) {
  return {
    type: ADD,
    data: data,
  };
}

export function deleteArmoryItem(id) {
  return {
    type: DELETE,
    id: id,
  };
}

export function initialiseArmoryItems() {
  return {
    type: INITIALISE,
  };
}

export function updateArmoryItem(id, data) {
  return {
    type: UPDATE,
    id: id,
    data: data,
  };
}
