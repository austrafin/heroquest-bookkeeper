import moxios from "moxios";

import {
  ADD_AFTER,
  DELETE_AFTER,
  LOAD,
  CARDS_LOADED,
  INITIALISE,
  SET_SELECTED_IMAGE,
  CLEAR_PENDING_CHANGES,
  addPlayerCard as actionAddPlayerCard,
  deletePlayerCard as actionDeletePlayerCard,
  addArmoryItem as actionAddArmoryItem,
  updateBaseValues as actionUpdateBaseValues,
  uploadImage as actionUploadImage,
} from "../actions/playerCards";
import store from "../store"; // gets rid of an error
import {
  loadPlayerCardData,
  addPlayerCard,
  deletePlayerCard,
  addArmoryItem,
  updateDatabase,
  updateBaseValues,
  uploadImage,
} from "./playerCards";
import { assertSaga } from "./commonFunctions";

describe("playerCards", () => {
  const baseURL = "http://localhost:5000/player_cards";
  const cardId = "123";

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("loadPlayerCardData", () => {
    it("should load the player cards from the API call the initialise and loading actions.", async () => {
      const cards = [
        {
          _id: cardId,
          characterName: "Dwarf",
          baseBodyPoints: 1,
          bodyPoints: 34,
          baseMindPoints: 2,
          mindPoints: 29,
          baseMeleePoints: 3,
          baseDiagonalPoints: 3,
          baseRangedPoints: 3,
          baseDefencePoints: 4,
          baseMovementPoints: 2,
          gold: 157,
          image: "./no_image.webp",
        },
      ];

      moxios.stubOnce("get", baseURL, {
        status: 200,
        response: cards,
      });

      await assertSaga(loadPlayerCardData, [
        { type: CARDS_LOADED, value: false },
        {
          type: INITIALISE,
          data: {
            [cardId]: {
              armoryItems: undefined,
              baseBodyPoints: 1,
              baseDefencePoints: 4,
              baseDiagonalPoints: 3,
              baseMeleePoints: 3,
              baseMindPoints: 2,
              baseMovementPoints: 2,
              baseRangedPoints: 3,
              bodyPoints: 34,
              characterName: "Dwarf",
              defencePoints: 4,
              diagonalPoints: 3,
              gold: 157,
              image: "./no_image.webp",
              meleePoints: 3,
              mindPoints: 29,
              movementPoints: 2,
              rangedPoints: 3,
            },
          },
        },
        { type: CARDS_LOADED, value: true },
      ]);
    });
  });

  describe("addPlayerCard", () => {
    it("should add a new player card via an API call the loading actions.", async () => {
      moxios.stubOnce("post", baseURL + "/add", {
        status: 201,
        response: "Player card added",
      });

      await assertSaga(
        addPlayerCard,
        [
          { type: CARDS_LOADED, value: false },
          { type: ADD_AFTER },
          { type: CARDS_LOADED, value: true },
        ],
        actionAddPlayerCard({
          characterName: "Dwarf",
          baseBodyPoints: 1,
          bodyPoints: 34,
          baseMindPoints: 2,
          baseMeleePoints: 3,
          baseDiagonalPoints: 3,
          baseRangedPoints: 3,
          baseDefencePoints: 4,
          baseMovementPoints: 2,
        })
      );
    });
  });

  describe("deletePlayerCard", () => {
    it("should delete a player card via an API call and call the delete and loading actions.", async () => {
      moxios.stubOnce("delete", baseURL + "/" + cardId, {
        status: 200,
        response: "PlayerCard deleted.",
      });

      await assertSaga(
        deletePlayerCard,
        [
          { type: CARDS_LOADED, value: false },
          { type: DELETE_AFTER, cardId: cardId },
          { type: CARDS_LOADED, value: true },
        ],
        actionDeletePlayerCard(cardId)
      );
    });
  });

  describe("addArmoryItem", () => {
    it("should successfully add a new armory item via an API call and call the player cards re-load action.", async () => {
      moxios.stubOnce("post", baseURL + "/add_armory_item/" + cardId, {
        status: 200,
        response: "Armory item added",
      });

      await assertSaga(
        addArmoryItem,
        [{ type: LOAD }],
        actionAddArmoryItem(cardId, "armory_123")
      );
    });

    it("should make an unsuccessful API call and no actions should be calles.", async () => {
      moxios.stubOnce("post", baseURL + "/add_armory_item/" + cardId, {
        status: 500,
        response: "",
      });

      await assertSaga(
        addArmoryItem,
        [],
        actionAddArmoryItem(cardId, "armory_123")
      );
    });
  });

  describe("updateDatabase", () => {
    it("should update the player card values via an API and call an action to clear the pending changes.", async () => {
      moxios.stubOnce("post", baseURL + "/update", {
        status: 200,
        response: "Player cards updated",
      });

      await assertSaga(updateDatabase, [{ type: CLEAR_PENDING_CHANGES }]);
    });
  });

  describe("updateBaseValues", () => {
    it("should update the player card base values via an API and call the player cards loading call.", async () => {
      moxios.stubOnce("post", baseURL + "/update", {
        status: 200,
        response: "Player cards updated",
      });

      await assertSaga(
        updateBaseValues,
        [{ type: CARDS_LOADED, value: false }],
        actionUpdateBaseValues(
          {
            characterName: "Dwarf",
            baseBodyPoints: 1,
            bodyPoints: 34,
            baseMindPoints: 2,
            baseMeleePoints: 3,
            baseDiagonalPoints: 3,
            baseRangedPoints: 3,
            baseDefencePoints: 4,
            baseMovementPoints: 2,
          },
          cardId
        )
      );
    });
  });

  describe("uploadImage", () => {
    it("should successfully upload a new image for a player card via an API call and call the image set action.", async () => {
      moxios.stubOnce("post", baseURL + "/upload_image/" + cardId, {
        status: 200,
        response: "Character image uploaded.",
      });

      await assertSaga(
        uploadImage,
        [
          {
            type: SET_SELECTED_IMAGE,
            selectedFile: null,
            cardId: cardId,
          },
        ],
        actionUploadImage(new Blob(), cardId)
      );
    });

    it("should fail to upload a new image for a player card via an API call and to not call any actions.", async () => {
      moxios.stubOnce("post", baseURL + "/upload_image/" + cardId, {
        status: 500,
        response: "",
      });

      await assertSaga(uploadImage, [], actionUploadImage(new Blob(), cardId));
    });
  });
});
