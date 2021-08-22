import React from "react";
import { mount } from "enzyme";
import GamePage from "./GamePage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import {
  REDUX_STORE_FIELDS as PlayerCardConstants,
  ALT_IMAGE_PATH,
} from "./constants/player_card.constants";
import { REDUX_STORE_FIELDS as ArmoryItemConstants } from "./constants/armory_item.constants";
import { loadPlayerCards, addPlayerCard } from "./actions/playerCards";
import { loadArmoryItems } from "./actions/armoryItems";

jest.mock("./actions/playerCards");
jest.mock("./actions/armoryItems");

describe("GamePage component", () => {
  const cardId = "card_123";
  const itemId = "item_123";
  const cardData = {
    [PlayerCardConstants.ARMORY_ITEMS]: undefined,
    [PlayerCardConstants.BASE_BODY_POINTS]: 1,
    [PlayerCardConstants.BASE_DEFENCE_POINTS]: 4,
    [PlayerCardConstants.BASE_DIAGONAL_POINTS]: 3,
    [PlayerCardConstants.BASE_MELEE_POINTS]: 3,
    [PlayerCardConstants.BASE_MIND_POINTS]: 2,
    [PlayerCardConstants.BASE_MOVEMENT_POINTS]: 2,
    [PlayerCardConstants.BASE_RANGED_POINTS]: 3,
    [PlayerCardConstants.BODY_POINTS]: 34,
    [PlayerCardConstants.CHARACTER_NAME]: "Dwarf",
    [PlayerCardConstants.DEFENCE_POINTS]: 4,
    [PlayerCardConstants.DIAGONAL_POINTS]: 3,
    [PlayerCardConstants.GOLD]: 157,
    [PlayerCardConstants.IMAGE]: ALT_IMAGE_PATH,
    [PlayerCardConstants.MELEE_POINTS]: 3,
    [PlayerCardConstants.MIND_POINTS]: 29,
    [PlayerCardConstants.MOVEMENT_POINTS]: 2,
    [PlayerCardConstants.RANGED_POINTS]: 3,
  };
  const armoryItemData = {
    [ArmoryItemConstants.ID]: itemId,
    [ArmoryItemConstants.DEFENCE_OPERATOR]: "+",
    [ArmoryItemConstants.DEFENCE_POINTS]: 3,
    [ArmoryItemConstants.DIAGONAL_OPERATOR]: "=",
    [ArmoryItemConstants.DIAGONAL_POINTS]: 66,
    [ArmoryItemConstants.MELEE_OPERATOR]: "-",
    [ArmoryItemConstants.MELEE_POINTS]: 5,
    [ArmoryItemConstants.MOVEMENT_OPERATOR]: "+",
    [ArmoryItemConstants.MOVEMENT_POINTS]: 3,
    [ArmoryItemConstants.NAME]: "miekka",
    [ArmoryItemConstants.RANGED_OPERATOR]: "+",
    [ArmoryItemConstants.RANGED_POINTS]: 3,
  };
  const mockStore = configureStore([]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Player cards loaded but armory items not loaded", () => {
    const store = mockStore({
      playerCards: { cardData: { [cardId]: cardData }, cardsLoaded: true },
      armoryItems: {},
    });
    const component = (
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    store.dispatch = jest.fn();

    it("renders correctly when the armory items have not been loaded yet", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the armory items load action is dispatched when the loaded flag is not set.", () => {
      mount(component);
      expect(loadArmoryItems).toHaveBeenCalledTimes(1);
    });
  });

  describe("Armory items loaded but player cards not loaded", () => {
    const store = mockStore({
      playerCards: {},
      armoryItems: {
        items: { [itemId]: armoryItemData },
        armoryItemsLoaded: true,
      },
    });
    const component = (
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    store.dispatch = jest.fn();

    it("renders correctly when the player cards have not been loaded yet", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the player cards load action is dispatched when the loaded flag is not set.", () => {
      mount(component);
      expect(loadPlayerCards).toHaveBeenCalledTimes(1);
    });
  });

  describe("Armory items and player cards loaded", () => {
    const state = {
      playerCards: { cardData: { [cardId]: cardData }, cardsLoaded: true },
      armoryItems: {
        items: { [itemId]: armoryItemData },
        armoryItemsLoaded: true,
      },
    };
    const store = mockStore({ ...state });
    const component = (
      <Provider store={store}>
        <GamePage />
      </Provider>
    );

    store.dispatch = jest.fn();

    it("renders correctly when the both player cards and armory items have been loaded.", () => {
      expect(mount(component)).toMatchSnapshot();
    });

    it("checks that the player cards load action is not dispatched when the loaded flag is set.", () => {
      mount(component);
      expect(loadPlayerCards).toHaveBeenCalledTimes(0);
    });

    it("checks that when a new player card is uploading the component is rendered correctly.", () => {
      expect(
        mount(
          <Provider
            store={mockStore({
              ...state,
              playerCards: { ...state.playerCards, newCardUploading: true },
            })}
          >
            <GamePage />
          </Provider>
        )
      ).toMatchSnapshot();
    });

    it("checks that the add player card action is dispatched when submitting the form.", () => {
      const mountedComponent = mount(component);
      mountedComponent
        .find('[data-test="add-playercard-button"]')
        .find("button")
        .simulate("click");
      mountedComponent
        .find(`[data-test="add-playercard-form"]`)
        .simulate("submit");
      expect(addPlayerCard).toHaveBeenCalledTimes(1);
    });
  });
});
