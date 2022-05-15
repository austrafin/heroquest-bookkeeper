import React from "react";
import { mount } from "enzyme";
import ArmoryPage from "./ArmoryPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as Constants from "../constants/armory_item.constants.js";
import { loadArmoryItems, addArmoryItem } from "../actions/armoryItems";

jest.mock("../actions/armoryItems");

describe("ArmoryPage component", () => {
  const mockStore = configureStore([]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Items not loaded", () => {
    const store = mockStore({ armoryItems: {} });
    const component = (
      <Provider store={store}>
        <ArmoryPage />
      </Provider>
    );

    store.dispatch = jest.fn();

    it("renders correctly when the items have not been loaded yet", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the armory items load action is dispatched when the loaded flag is not set.", () => {
      mount(component);
      expect(loadArmoryItems).toHaveBeenCalledTimes(1);
    });
  });

  describe("Items loaded", () => {
    const formTest = "add-armory-item";
    const itemId = "item_123";
    const store = mockStore({
      armoryItems: {
        items: {
          [itemId]: {
            [Constants.ID]: itemId,
            [Constants.NAME]: "item name",
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
        },
        armoryItemsLoaded: true,
      },
    });

    const component = (
      <Provider store={store}>
        <ArmoryPage testSubmitForm={formTest} />
      </Provider>
    );

    store.dispatch = jest.fn();

    it("renders correctly when the items have been loaded.", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the armory items load action is not dispatched when the loaded flag is set.", () => {
      mount(component);
      expect(loadArmoryItems).toHaveBeenCalledTimes(0);
    });

    it("checks that the new armory item action is dispatched when the form is submitted.", () => {
      const mountedComponent = mount(component);
      mountedComponent
        .find('[data-test="add-button"]')
        .find("button")
        .simulate("click");
      mountedComponent.find(`[data-test="${formTest}"]`).simulate("submit");
      expect(addArmoryItem).toHaveBeenCalledTimes(1);
    });
  });
});
