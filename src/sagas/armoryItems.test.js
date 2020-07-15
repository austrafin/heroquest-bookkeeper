import moxios from "moxios";
import {
  ARMORY_ITEMS_LOADED,
  INITIALISE_AFTER,
  addArmoryItem as actionAddArmoryItem,
  updateArmoryItem,
  deleteArmoryItem as actionDeleteArmoryItem,
} from "../actions/armoryItems";
import { CARDS_LOADED } from "../actions/playerCards";
import {
  loadArmoryItems,
  addArmoryItem,
  updateDatabase,
  deleteArmoryItem,
} from "./armoryItems";
import { assertSaga } from "./commonFunctions";

describe("armoryItems", () => {
  const baseURL = "http://localhost:5000/armory_items";
  const itemId = "123";
  const armoryItems = {
    defenceOperator: "+",
    defencePoints: 3,
    diagonalOperator: "=",
    diagonalPoints: 66,
    meleeOperator: "-",
    meleePoints: 5,
    movementOperator: "+",
    movementPoints: 3,
    name: "miekka",
    rangedOperator: "+",
    rangedPoints: 3,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("loadArmoryItems", () => {
    it("should load the armory items via an API call and call the initialise and loading actions.", async () => {
      const armoryItemsDB = { ...armoryItems, _id: itemId };
      const armoryItemsRedux = { ...armoryItems, id: itemId };

      moxios.stubOnce("get", baseURL, {
        status: 200,
        response: [armoryItemsDB],
      });

      await assertSaga(loadArmoryItems, [
        { type: ARMORY_ITEMS_LOADED, value: false },
        { type: INITIALISE_AFTER, data: { [itemId]: armoryItemsRedux } },
        { type: ARMORY_ITEMS_LOADED, value: true },
      ]);
    });
  });

  describe("addArmoryItem", () => {
    it("should add a new armory item via an API call the loading action.", async () => {
      moxios.stubOnce("post", baseURL + "/add", {
        status: 201,
        response: "Armory item added",
      });

      await assertSaga(
        addArmoryItem,
        [{ type: ARMORY_ITEMS_LOADED, value: false }],
        actionAddArmoryItem(armoryItems)
      );
    });
  });

  describe("updateDatabase", () => {
    it("should update the armory item values via an API and call the loading action.", async () => {
      moxios.stubOnce("post", baseURL + "/update/" + itemId, {
        status: 200,
        response: "Armory item updated",
      });

      await assertSaga(
        updateDatabase,
        [{ type: ARMORY_ITEMS_LOADED, value: false }],
        updateArmoryItem(itemId, armoryItems)
      );
    });
  });

  describe("deleteArmoryItem", () => {
    it("should delete the armory item via an API and call the loading actions.", async () => {
      moxios.stubOnce("delete", baseURL + "/" + itemId, {
        status: 200,
        response: "Armory item deleted",
      });

      await assertSaga(
        deleteArmoryItem,
        [
          { type: ARMORY_ITEMS_LOADED, value: false },
          { type: CARDS_LOADED, value: false },
        ],
        actionDeleteArmoryItem(itemId)
      );
    });
  });
});
