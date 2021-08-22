import * as actions from "../actions/playerCards";

describe("playerCards actions", () => {
  const cardId = "123";
  const label = "label";
  const values = {};
  const selectedFile = null;

  it("should create an action for adding a new player card", () => {
    expect(actions.addPlayerCard(values)).toEqual({
      type: actions.ADD,
      values: values,
    });
  });

  it("should create an action for new player card post action", () => {
    expect(actions.addPlayerCardPostAction()).toEqual({
      type: actions.ADD_AFTER,
    });
  });

  it("should create an action for deleting a player card", () => {
    expect(actions.deletePlayerCard(cardId)).toEqual({
      type: actions.DELETE,
      cardId: cardId,
    });
  });

  it("should create an action for delete player card post action", () => {
    expect(actions.deletePlayerCardPostAction(cardId)).toEqual({
      type: actions.DELETE_AFTER,
      cardId: cardId,
    });
  });

  it("should create an action for updating player card base values", () => {
    expect(actions.updateBaseValues(values, cardId)).toEqual({
      type: actions.UPDATE_BASE_VALUES,
      cardId: cardId,
      values: values,
    });
  });

  it("should create an action for loading the player cards.", () => {
    expect(actions.loadPlayerCards()).toEqual({
      type: actions.LOAD,
    });
  });

  it("should create an action for settings the label values.", () => {
    const value = "value";
    expect(actions.setValue(value, label, cardId)).toEqual({
      type: actions.SET_VALUE,
      value: value,
      label: label,
      cardId: cardId,
    });
  });

  it("should create an action for incrementing a label value.", () => {
    const incrementValue = 1;
    expect(actions.increment(incrementValue, label, cardId)).toEqual({
      type: actions.INCREMENT,
      incrementValue: incrementValue,
      label: label,
      cardId: cardId,
    });
  });

  it("should create an action for decrementing a label value.", () => {
    const decrementValue = 1;
    expect(actions.decrement(decrementValue, label, cardId)).toEqual({
      type: actions.DECREMENT,
      incrementValue: decrementValue,
      label: label,
      cardId: cardId,
    });
  });

  it("should create an action for setting the selected image file.", () => {
    expect(actions.setSelectedImageFile(selectedFile, cardId)).toEqual({
      type: actions.SET_SELECTED_IMAGE,
      selectedFile: selectedFile,
      cardId: cardId,
    });
  });

  it("should create an action for uploading an image file.", () => {
    expect(actions.uploadImage(selectedFile, cardId)).toEqual({
      type: actions.UPLOAD_IMAGE,
      selectedFile: selectedFile,
      cardId: cardId,
    });
  });

  it("should create an action for adding an armory item.", () => {
    const itemId = "armory_123";
    expect(actions.addArmoryItem(cardId, itemId)).toEqual({
      type: actions.ADD_ARMORY_ITEM,
      cardId: cardId,
      itemId: itemId,
    });
  });

  it("should create an action for setting an input value on a player card.", () => {
    const value = 10;
    const status = "status";
    expect(actions.setInputValue(value, status, cardId)).toEqual({
      type: actions.SET_INPUT_VALUE,
      status: status,
      value: value,
      cardId: cardId,
    });
  });

  it("should create an action for initialising player card data.", () => {
    expect(actions.initialisePlayerCards(values)).toEqual({
      type: actions.INITIALISE,
      data: values,
    });
  });

  it("should create an action for setting player cards loaded", () => {
    expect(actions.setCardsLoaded(true)).toEqual({
      type: actions.CARDS_LOADED,
      value: true,
    });
  });

  it("should create an action for clearing the pending changes", () => {
    expect(actions.clearPendingChanges()).toEqual({
      type: actions.CLEAR_PENDING_CHANGES,
    });
  });
});
