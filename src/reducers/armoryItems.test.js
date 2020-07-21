import reducer from "./armoryItems";
import * as actions from "../actions/armoryItems";
import { REDUX_STORE_FIELDS as Constants } from "../constants/armory_item.constants";

describe("armoryItems reducer", () => {
  const itemId = "123";
  it("should return a new state with the values from the database.", () => {
    const values = {
      [itemId]: {
        [Constants.ID]: itemId,
        [Constants.NAME]: "miekka",
        [Constants.DEFENCE_OPERATOR]: "+",
        [Constants.DEFENCE_POINTS]: 1,
        [Constants.DIAGONAL_OPERATOR]: "-",
        [Constants.DIAGONAL_POINTS]: 2,
        [Constants.MELEE_OPERATOR]: "=",
        [Constants.MELEE_POINTS]: 3,
        [Constants.MOVEMENT_OPERATOR]: "+",
        [Constants.MOVEMENT_POINTS]: 4,
        [Constants.RANGED_OPERATOR]: "-",
        [Constants.RANGED_POINTS]: 5,
      },
    };

    expect(reducer(null, actions.initialiseArmoryItems(values))).toEqual({
      items: values,
    });
  });

  it("should return a new state with the armoryItemsLoaded flag set true.", () => {
    expect(reducer(null, actions.setArmoryItemsLoaded(true))).toEqual({
      armoryItemsLoaded: true,
    });
  });

  it("should return a new state with the armoryItemsLoaded flag set false.", () => {
    expect(reducer(null, actions.setArmoryItemsLoaded(false))).toEqual({
      armoryItemsLoaded: false,
    });
  });
});
