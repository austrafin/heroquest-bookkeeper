export const ADD = "playerCards/ADD";
export const ADD_AFTER = "playerCards/ADD_AFTER";
export const DELETE = "playerCards/DELETE";
export const DELETE_AFTER = "playerCards/DELETE_AFTER";
export const UPDATE_BASE_VALUES = "playerCards/UPDATE_BASE_VALUES";
export const LOAD = "playerCards/LOAD";
export const CARDS_LOADED = "playerCards/CARDS_LOADED";
export const SET_VALUE = "playerCards/SET_VALUE";
export const INCREMENT = "playerCards/INCREMENT";
export const DECREMENT = "playerCards/DECREMENT";
export const INITIALISE = "playerCards/INITIALISE";
export const SET_SELECTED_IMAGE = "playerCards/SET_SELECTED_IMAGE";
export const UPLOAD_IMAGE = "playerCards/UPLOAD_IMAGE";
export const ADD_ARMORY_ITEM = "playerCards/ADD_ARMORY_ITEM";
export const DELETE_ARMORY_ITEM = "playerCards/DELETE_ARMORY_ITEM";
export const CLEAR_PENDING_CHANGES = "playerCards/CLEAR_PENDING_CHANGES";
export const SET_INPUT_VALUE = "playerCards/SET_INPUT_VALUE";

export function addPlayerCard(values) {
  return {
    type: ADD,
    values: values,
  };
}

export function addPlayerCardPostAction() {
  return { type: ADD_AFTER };
}

export function deletePlayerCard(cardId) {
  return {
    type: DELETE,
    cardId: cardId,
  };
}

export function deletePlayerCardPostAction(cardId) {
  return {
    type: DELETE_AFTER,
    cardId: cardId,
  };
}

export function updateBaseValues(values, cardId) {
  return {
    type: UPDATE_BASE_VALUES,
    cardId: cardId,
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

export function deleteArmoryItem(cardId, itemId) {
  return {
    type: DELETE_ARMORY_ITEM,
    cardId: cardId,
    itemId: itemId,
  };
}

export function setInputValue(value, status, cardId) {
  return {
    type: SET_INPUT_VALUE,
    status: status,
    value: value,
    cardId: cardId,
  };
}

export function initialisePlayerCards(initialValues) {
  return { type: INITIALISE, data: initialValues };
}

export function setCardsLoaded(value) {
  return { type: CARDS_LOADED, value: value };
}

export function clearPendingChanges() {
  return { type: CLEAR_PENDING_CHANGES };
}
