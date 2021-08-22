import reducer from "./playerCards";
import * as actions from "../actions/playerCards";
import { REDUX_STORE_FIELDS as Constants } from "../constants/player_card.constants";

describe("playerCards reducers", () => {
  const cardId = "123";
  const label = "label";

  it("should return a new state with the new field value.", () => {
    expect(
      reducer(
        { cardData: { [cardId]: {} } },
        actions.setValue("value", "label", cardId)
      )
    ).toEqual({ cardData: { [cardId]: { label: "value" } } });
  });

  it("should return the initial state if the card id does not exist in cardData.", () => {
    expect(
      reducer({ cardData: {} }, actions.setValue("value", "label", cardId))
    ).toEqual({ cardData: {} });
  });

  it("should return a new state with the incremented value.", () => {
    const incrementValue = 2;
    expect(
      reducer(
        {
          cardData: {
            [cardId]: {
              [label]: 1,
            },
          },
          pendingChanges: {},
        },
        actions.increment(incrementValue, label, cardId)
      )
    ).toEqual({
      cardData: {
        [cardId]: {
          [label]: 3,
        },
      },
      pendingChanges: {
        [cardId]: {
          [label]: 3,
        },
      },
    });
  });

  it("should return a new state with the decremented value.", () => {
    const decrementValue = 2;
    expect(
      reducer(
        {
          cardData: {
            [cardId]: {
              [label]: 3,
            },
          },
          pendingChanges: {},
        },
        actions.decrement(decrementValue, label, cardId)
      )
    ).toEqual({
      cardData: {
        [cardId]: {
          [label]: 1,
        },
      },
      pendingChanges: {
        [cardId]: {
          [label]: 1,
        },
      },
    });
  });

  it("should return a new state with the data fetched from the database.", () => {
    expect(
      reducer(
        { pendingChanges: {} },
        actions.initialisePlayerCards({ [cardId]: {} })
      )
    ).toEqual({
      cardData: { [cardId]: {} },
      pendingChanges: {},
    });
  });

  it("should return a new state with the new card upload flag set true.", () => {
    expect(reducer(null, actions.addPlayerCard({}))).toEqual({
      newCardUploading: true,
    });
  });

  it("should return a new state with the new card upload flag set false.", () => {
    expect(reducer(null, actions.addPlayerCardPostAction({}))).toEqual({
      newCardUploading: false,
    });
  });

  it("should return a new state with the data of the deleted card removed.", () => {
    expect(
      reducer(
        {
          cardData: {
            [cardId]: {},
          },
        },
        actions.deletePlayerCardPostAction(cardId)
      )
    ).toEqual({ cardData: {} });
  });

  it("should return a new state cards loaded flag set true.", () => {
    expect(reducer({}, actions.setCardsLoaded(true))).toEqual({
      cardsLoaded: true,
    });
  });

  it("should return a new state cards loaded flag set false.", () => {
    expect(reducer({}, actions.setCardsLoaded(false))).toEqual({
      cardsLoaded: false,
    });
  });

  it("should return a new state with the selected image file.", () => {
    const selectedFile = null;
    expect(
      reducer(
        { cardData: { [cardId]: {} } },
        actions.setSelectedImageFile(selectedFile, cardId)
      )
    ).toEqual({ cardData: { [cardId]: { selectedImageFile: selectedFile } } });
  });

  it("should return a new state with the updated base values.", () => {
    const baseValues = {
      [Constants.BASE_BODY_POINTS]: 1,
      [Constants.BASE_MIND_POINTS]: 2,
      [Constants.BASE_MELEE_POINTS]: 3,
      [Constants.BASE_RANGED_POINTS]: 4,
      [Constants.BASE_DIAGONAL_POINTS]: 5,
      [Constants.BASE_DEFENCE_POINTS]: 6,
      [Constants.BASE_MOVEMENT_POINTS]: 7,
    };
    expect(
      reducer(
        { cardData: { [cardId]: {} } },
        actions.updateBaseValues(baseValues, cardId)
      )
    ).toEqual({
      cardData: {
        [cardId]: {
          [Constants.BASE_BODY_POINTS]: baseValues[Constants.BASE_BODY_POINTS],
          [Constants.BASE_MIND_POINTS]: baseValues[Constants.BASE_MIND_POINTS],
          [Constants.BASE_MELEE_POINTS]:
            baseValues[Constants.BASE_MELEE_POINTS],
          [Constants.BASE_RANGED_POINTS]:
            baseValues[Constants.BASE_RANGED_POINTS],
          [Constants.BASE_DIAGONAL_POINTS]:
            baseValues[Constants.BASE_DIAGONAL_POINTS],
          [Constants.BASE_DEFENCE_POINTS]:
            baseValues[Constants.BASE_DEFENCE_POINTS],
          [Constants.BASE_MOVEMENT_POINTS]:
            baseValues[Constants.BASE_MOVEMENT_POINTS],
        },
      },
    });
  });

  it("should return a new state with the pending changes cleared.", () => {
    expect(
      reducer(
        { pendingChanges: { [cardId]: { field: 123 } } },
        actions.clearPendingChanges()
      )
    ).toEqual({ pendingChanges: {} });
  });

  it("should return a new state with the new input value.", () => {
    const status = "status";
    const inputValue = 112;
    expect(
      reducer(
        { cardData: { [cardId]: {} } },
        actions.setInputValue(inputValue, status, cardId)
      )
    ).toEqual({
      cardData: { [cardId]: { inputValues: { [status]: inputValue } } },
    });
  });
});
