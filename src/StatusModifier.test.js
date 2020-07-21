import React from "react";
import { shallow, mount } from "enzyme";
import StatusModifier from "./StatusModifier";
import { Provider } from "react-redux";
import { increment, decrement } from "./actions/playerCards";
import configureStore from "redux-mock-store";

jest.mock("./actions/playerCards");

describe("StatusModifier", () => {
  const mockStore = configureStore([]);
  const cardId = "test_123";
  const store = mockStore({
    playerCards: {
      cardData: {
        [cardId]: { inputValues: {} },
      },
    },
  });

  store.dispatch = jest.fn();

  beforeEach(() => {
    increment.mockClear();
    decrement.mockClear();
  });

  it("renders", () => {
    const component = shallow(
      <Provider store={store}>
        <StatusModifier />
      </Provider>
    );

    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
  });

  describe("Increment and decrement", () => {
    const component = mount(
      <Provider store={store}>
        <StatusModifier
          labelText={"test label"}
          maxValue={100}
          step={1}
          defaultValue={1}
          labelParameter="testParameter"
          cardId={cardId}
        />
      </Provider>
    );

    it("checks that the increment action is dispatched when the increment button is clicked.", () => {
      component
        .find('[data-test="increment"]')
        .find("button")
        .simulate("click");

      expect(increment).toHaveBeenCalledTimes(1);
    });

    it("checks that the increment action is dispatched when the increment button is clicked.", () => {
      component
        .find('[data-test="decrement"]')
        .find("button")
        .simulate("click");

      expect(decrement).toHaveBeenCalledTimes(1);
    });
  });
});
