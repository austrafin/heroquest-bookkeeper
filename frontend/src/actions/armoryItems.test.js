import * as actions from "../actions/armoryItems";

describe("addArmoryItems actions", () => {
  const itemId = "123";
  const data = {};

  it("should create an action for adding a new armory item.", () => {
    expect(actions.addArmoryItem(data)).toEqual({
      type: actions.ADD,
      data: data,
    });
  });

  it("should create an action for deleting an armory item.", () => {
    expect(actions.deleteArmoryItem(itemId)).toEqual({
      type: actions.DELETE,
      id: itemId,
    });
  });

  it("should create an action for fetching the armory items.", () => {
    expect(actions.loadArmoryItems()).toEqual({
      type: actions.LOAD,
    });
  });

  it("should create an action for initialising armory items.", () => {
    expect(actions.initialiseArmoryItems({})).toEqual({
      type: actions.INITIALISE,
      data: {},
    });
  });

  it("should create an action for updating an armory item.", () => {
    expect(actions.updateArmoryItem(itemId, data)).toEqual({
      type: actions.UPDATE,
      id: itemId,
      data: data,
    });
  });

  it("should create an action for setting the armory items loaded flag true.", () => {
    expect(actions.setArmoryItemsLoaded(true)).toEqual({
      type: actions.ARMORY_ITEMS_LOADED,
      value: true,
    });
  });

  it("should create an action for setting the armory items loaded flag false.", () => {
    expect(actions.setArmoryItemsLoaded(false)).toEqual({
      type: actions.ARMORY_ITEMS_LOADED,
      value: false,
    });
  });
});
