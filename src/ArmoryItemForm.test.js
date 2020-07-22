import React from "react";
import { mount } from "enzyme";
import ArmoryItemForm from "./ArmoryItemForm";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { deleteArmoryItem } from "./actions/armoryItems";

jest.mock("./actions/armoryItems");

describe("ArmoryItemForm component", () => {
  const mockStore = configureStore([]);
  const store = mockStore({});

  store.dispatch = jest.fn();

  const componentWithDelete = mount(
    <Provider store={store}>
      <ArmoryItemForm
        submitButtonText="Save changes"
        delete={true}
        id={"item_123"}
        name="item name"
        meleeOperator="+"
        meleePoints={1}
        rangedOperator="-"
        rangedPoints={2}
        diagonalOperator="="
        diagonalPoints={3}
        defenceOperator="+"
        defencePoints={4}
        movementOperator="-"
        movementPoints={5}
      />
    </Provider>
  );

  it("renders correctly with the delete button", () => {
    expect(
      componentWithDelete.find('[data-test="delete-button"]').exists()
    ).toBeTruthy();
    expect(componentWithDelete).toMatchSnapshot();
  });

  it("renders correctly without the delete button", () => {
    const componentNoDelete = mount(
      <Provider store={store}>
        <ArmoryItemForm
          submitButtonText="Save changes"
          delete={false}
          id={"item_123"}
          name="item name"
          meleeOperator="+"
          meleePoints={1}
          rangedOperator="-"
          rangedPoints={2}
          diagonalOperator="="
          diagonalPoints={3}
          defenceOperator="+"
          defencePoints={4}
          movementOperator="-"
          movementPoints={5}
        />
      </Provider>
    );
    expect(
      componentNoDelete.find('[data-test="delete-button"]').exists()
    ).toBeFalsy();
    expect(componentNoDelete).toMatchSnapshot();
  });

  it("checks that the armory item delete action is dispatched when the delete button is clicked.", () => {
    componentWithDelete
      .find('[data-test="delete-button"]')
      .find("button")
      .simulate("click");
    expect(deleteArmoryItem).toHaveBeenCalledTimes(1);
  });

  it("checks that the item name value is actually changed after the onChange event.", () => {
    const newValue = "new value";
    componentWithDelete
      .find('[data-test="name-field"]')
      .find("input")
      .simulate("change", { target: { value: newValue } });
    expect(
      componentWithDelete
        .find('[data-test="name-field"]')
        .find("input")
        .instance().value
    ).toBe(newValue);
  });
});
