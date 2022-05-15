import React from "react";
import { mount } from "enzyme";
import ArmoryItem from "./ArmoryItem";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as Constants from "../../constants/armory_item.constants.js";
import { updateArmoryItem } from "../../actions/armoryItems";

jest.mock("../../actions/armoryItems");

describe("ArmoryItem component", () => {
  const formTest = "update-armory-item";
  const mockStore = configureStore([]);
  const store = mockStore({});

  store.dispatch = jest.fn();

  const component = (
    <Provider store={store}>
      <ArmoryItem
        data={{
          [Constants.ID]: "test_123",
          [Constants.NAME]: "name",
          [Constants.MELEE_OPERATOR]: "+",
          [Constants.MELEE_POINTS]: 1,
          [Constants.RANGED_OPERATOR]: "-",
          [Constants.RANGED_POINTS]: 2,
          [Constants.DIAGONAL_OPERATOR]: "=",
          [Constants.DIAGONAL_POINTS]: 3,
          [Constants.DEFENCE_OPERATOR]: "+",
          [Constants.DEFENCE_POINTS]: 4,
          [Constants.MOVEMENT_OPERATOR]: "+",
          [Constants.MOVEMENT_POINTS]: 5,
        }}
        testSubmitForm={formTest}
      />
    </Provider>
  );

  it("renders correctly", () => {
    expect(mount(component)).toMatchSnapshot();
  });

  it("checks that the armory item update action is dispatched when the form is submitted.", () => {
    mount(component).find(`[data-test="${formTest}"]`).simulate("submit");
    expect(updateArmoryItem).toHaveBeenCalledTimes(1);
  });
});
