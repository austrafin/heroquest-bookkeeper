import moxios from "moxios";

import {
  addPlayerCard as actionAddPlayerCard,
  deletePlayerCard as actionDeletePlayerCard,
  addArmoryItem as actionAddArmoryItem,
  updateBaseValues as actionUpdateBaseValues,
  uploadImage as actionUploadImage,
  setCardsLoaded,
  addPlayerCardPostAction,
  deletePlayerCardPostAction,
  loadPlayerCards,
  setSelectedImageFile,
  initialisePlayerCards,
  clearPendingChanges,
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
import {
  REDUX_STORE_FIELDS as Constants,
  ALT_IMAGE_PATH,
  DB_FIELDS as DB,
} from "../constants/player_card.constants";

describe("playerCards", () => {
  const baseURL = process.env.REACT_APP_API_BASE_URL + "player_cards";
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
          [DB.ID]: cardId,
          [DB.CHARACTER_NAME]: "Dwarf",
          [DB.BASE_BODY_POINTS]: 1,
          [DB.BODY_POINTS]: 34,
          [DB.BASE_MIND_POINTS]: 2,
          [DB.MIND_POINTS]: 29,
          [DB.BASE_MELEE_POINTS]: 3,
          [DB.BASE_DIAGONAL_POINTS]: 3,
          [DB.BASE_RANGED_POINTS]: 3,
          [DB.BASE_DEFENCE_POINTS]: 4,
          [DB.BASE_MOVEMENT_POINTS]: 2,
          [DB.GOLD]: 157,
          [DB.IMAGE]: undefined,
        },
      ];

      moxios.stubOnce("get", baseURL, {
        status: 200,
        response: cards,
      });

      await assertSaga(loadPlayerCardData, [
        setCardsLoaded(false),
        initialisePlayerCards({
          [cardId]: {
            [Constants.ARMORY_ITEMS]: undefined,
            [Constants.BASE_BODY_POINTS]: 1,
            [Constants.BASE_DEFENCE_POINTS]: 4,
            [Constants.BASE_DIAGONAL_POINTS]: 3,
            [Constants.BASE_MELEE_POINTS]: 3,
            [Constants.BASE_MIND_POINTS]: 2,
            [Constants.BASE_MOVEMENT_POINTS]: 2,
            [Constants.BASE_RANGED_POINTS]: 3,
            [Constants.BODY_POINTS]: 34,
            [Constants.CHARACTER_NAME]: "Dwarf",
            [Constants.DEFENCE_POINTS]: 4,
            [Constants.DIAGONAL_POINTS]: 3,
            [Constants.GOLD]: 157,
            [Constants.IMAGE]: ALT_IMAGE_PATH,
            [Constants.MELEE_POINTS]: 3,
            [Constants.MIND_POINTS]: 29,
            [Constants.MOVEMENT_POINTS]: 2,
            [Constants.RANGED_POINTS]: 3,
          },
        }),
        setCardsLoaded(true),
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
          setCardsLoaded(false),
          addPlayerCardPostAction(),
          setCardsLoaded(true),
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
          setCardsLoaded(false),
          deletePlayerCardPostAction(cardId),
          setCardsLoaded(true),
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
        [loadPlayerCards()],
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

      await assertSaga(updateDatabase, [clearPendingChanges()]);
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
        [setCardsLoaded(false)],
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
        [setSelectedImageFile(null, cardId)],
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
