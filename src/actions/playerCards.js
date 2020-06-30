export const ADD = "playerCards/ADD";
export const ADD_AFTER = "playerCards/ADD_AFTER";
export const LOAD = "playerCards/LOAD";
export const CARDS_LOADED = "playerCards/CARDS_LOADED";
export const SET_VALUE = "playerCards/SET_VALUE";
export const INCREMENT = "playerCards/INCREMENT";
export const DECREMENT = "playerCards/DECREMENT";
export const INITIALISE = "playerCards/INITIALISE";
export const SET_SELECTED_IMAGE = "playerCards/SET_SELECTED_IMAGE";
export const UPLOAD_IMAGE = "playerCards/UPLOAD_IMAGE";
export const ADD_ARMORY_ITEM = "playerCards/ADD_ARMORY_ITEM";
export const ARMORY_ITEM_ADDED = "playerCards/ARMORY_ITEM_ADDED";

export function addPlayerCard(values) {
  return {
    type: ADD,
    values: values,
  };
}

export function loadPlayerCards() {
  return {
    type: LOAD,
  };
}

export function setValue(value, label, cardId) {
  return {
    type: SET_VALUE,
    value: value,
    label: label,
    cardId: cardId,
  };
}

export function increment(value, label, cardId) {
  return {
    type: INCREMENT,
    incrementValue: value,
    label: label,
    cardId: cardId,
  };
}

export function decrement(value, label, cardId) {
  return {
    type: DECREMENT,
    incrementValue: value,
    label: label,
    cardId: cardId,
  };
}

export function setSelectedImageFile(selectedFile, cardId) {
  return {
    type: SET_SELECTED_IMAGE,
    selectedFile: selectedFile,
    cardId: cardId,
  };
}

export function uploadImage(selectedFile, cardId) {
  return {
    type: UPLOAD_IMAGE,
    selectedFile: selectedFile,
    cardId: cardId,
  };
}

export function addArmoryItem(cardId, itemId) {
  return {
    type: ADD_ARMORY_ITEM,
    cardId: cardId,
    itemId: itemId,
  };
}
