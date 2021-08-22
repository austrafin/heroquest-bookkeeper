import moxios from "moxios";
import {
  addArmoryItem as actionAddArmoryItem,
  updateArmoryItem,
  deleteArmoryItem as actionDeleteArmoryItem,
  setArmoryItemsLoaded,
  initialiseArmoryItems,
} from "../actions/armoryItems";
import { setCardsLoaded } from "../actions/playerCards";
import {
  loadArmoryItems,
  addArmoryItem,
  updateDatabase,
  deleteArmoryItem,
} from "./armoryItems";
import { assertSaga } from "./commonFunctions";
import {
  REDUX_STORE_FIELDS as Constants,
  DB_FIELDS as DB,
} from "../constants/armory_item.constants";

describe("armoryItems", () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL + "armory_items";
  const itemId = "123";
  const armoryItems = {
    [Constants.DEFENCE_OPERATOR]: "+",
    [Constants.DEFENCE_POINTS]: 3,
    [Constants.DIAGONAL_OPERATOR]: "=",
    [Constants.DIAGONAL_POINTS]: 66,
    [Constants.MELEE_OPERATOR]: "-",
    [Constants.MELEE_POINTS]: 5,
    [Constants.MOVEMENT_OPERATOR]: "+",
    [Constants.MOVEMENT_POINTS]: 3,
    [Constants.NAME]: "miekka",
    [Constants.RANGED_OPERATOR]: "+",
    [Constants.RANGED_POINTS]: 3,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("loadArmoryItems", () => {
    it("should load the armory items via API and call the initialise and loading actions.", async () => {
      moxios.stubOnce("get", baseURL, {
        status: 200,
        response: [
          {
            [DB.ID]: itemId,
            [DB.DEFENCE_OPERATOR]: "+",
            [DB.DEFENCE_POINTS]: 3,
            [DB.DIAGONAL_OPERATOR]: "=",
            [DB.DIAGONAL_POINTS]: 66,
            [DB.MELEE_OPERATOR]: "-",
            [DB.MELEE_POINTS]: 5,
            [DB.MOVEMENT_OPERATOR]: "+",
            [DB.MOVEMENT_POINTS]: 3,
            [DB.NAME]: "miekka",
            [DB.RANGED_OPERATOR]: "+",
            [DB.RANGED_POINTS]: 3,
          },
        ],
      });

      await assertSaga(loadArmoryItems, [
        setArmoryItemsLoaded(false),
        initialiseArmoryItems({
          [itemId]: {
            [Constants.ID]: itemId,
            ...armoryItems,
          },
        }),
        setArmoryItemsLoaded(true),
      ]);
    });
  });

  describe("addArmoryItem", () => {
    it("should add a new armory item via API and call the loading action.", async () => {
      moxios.stubOnce("post", baseURL + "/add", {
        status: 201,
        response: "Armory item added",
      });

      await assertSaga(
        addArmoryItem,
        [setArmoryItemsLoaded(false)],
        actionAddArmoryItem(armoryItems)
      );
    });
  });

  describe("updateDatabase", () => {
    it("should update the armory item values via API and call the loading action.", async () => {
      moxios.stubOnce("post", baseURL + "/update/" + itemId, {
        status: 200,
        response: "Armory item updated",
      });

      await assertSaga(
        updateDatabase,
        [setArmoryItemsLoaded(false)],
        updateArmoryItem(itemId, armoryItems)
      );
    });
  });

  describe("deleteArmoryItem", () => {
    it("should delete the armory item via API and call the loading actions.", async () => {
      moxios.stubOnce("delete", baseURL + "/" + itemId, {
        status: 200,
        response: "Armory item deleted",
      });

      await assertSaga(
        deleteArmoryItem,
        [setArmoryItemsLoaded(false), setCardsLoaded(false)],
        actionDeleteArmoryItem(itemId)
      );
    });
  });
});
