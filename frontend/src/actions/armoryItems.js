export const ADD = "armoryItems/ADD";
export const DELETE = "armoryItems/DELETE";
export const UPDATE = "armoryItems/UPDATE";
export const ARMORY_ITEMS_LOADED = "armoryItems/ARMORY_ITEMS_LOADED";
export const LOAD = "armoryItems/LOAD";
export const INITIALISE = "armoryItems/INITIALISE";

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

export function loadArmoryItems() {
  return {
    type: LOAD,
  };
}

export function initialiseArmoryItems(armoryItems) {
  return { type: INITIALISE, data: armoryItems };
}

export function updateArmoryItem(id, data) {
  return {
    type: UPDATE,
    id: id,
    data: data,
  };
}

export function setArmoryItemsLoaded(value) {
  return { type: ARMORY_ITEMS_LOADED, value: value };
}
