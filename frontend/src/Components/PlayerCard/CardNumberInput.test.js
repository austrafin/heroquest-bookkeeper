import React from "react";
import { mount } from "enzyme";
import CardNumberInput from "./CardNumberInput";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { setInputValue } from "../../actions/playerCards";

jest.mock("../../actions/playerCards");

describe("CardNumberInput component", () => {
  const cardId = "123";
  const labelParameter = "label";
  const mockStore = configureStore([]);
  const cardNumberInput = (
    <CardNumberInput cardId={cardId} labelParameter={labelParameter} />
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("InputValues not defined", () => {
    const store = mockStore({
      playerCards: { cardData: { [cardId]: { inputValues: {} } } },
    });
    const component = <Provider store={store}>{cardNumberInput}</Provider>;

    store.dispatch = jest.fn();

    it("renders correctly", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the action for setting the default input value is dispatched when the inputValue is not defined in the redux store.", () => {
      mount(component);
      expect(setInputValue).toHaveBeenCalledTimes(1);
    });
  });

  describe("InputValues are defined", () => {
    const store = mockStore({
      playerCards: {
        cardData: { [cardId]: { inputValues: { [labelParameter]: 111 } } },
      },
    });
    const component = <Provider store={store}>{cardNumberInput}</Provider>;

    store.dispatch = jest.fn();

    it("renders correctly", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the action for setting the default input value is not dispatched when the inputValue is already defined in the redux store.", () => {
      mount(component);
      expect(setInputValue).toHaveBeenCalledTimes(0);
    });

    it("checks that when the input value is changed the set input value action is dispatched.", () => {
      mount(component)
        .find('[data-test="test-number-input"]')
        .find("input")
        .simulate("change", { target: { value: 123 } });

      expect(setInputValue).toHaveBeenCalledTimes(1);
    });
  });
});
