/**
 * @swagger
 * tags:
 *   name: Player cards
 *   description: API to manage player cards in the game.
 * components:
 *   schemas:
 *     PlayerCard:
 *       type: object
 *       required:
 *         - characterName
 *         - baseBodyPoints
 *         - baseMindPoints
 *       properties:
 *         _id:
 *           type: uuid
 *           description: Unique identifier for the player card
 *         characterName:
 *           type: string
 *           description: The name of the character
 *         baseBodyPoints:
 *           type: integer
 *           description: The base body points that the character starts with
 *         bodyPoints:
 *           type: integer
 *           description: Current body points of the character - if not
 *                        provided defaults to the base body points
 *         baseMindPoints:
 *           type: integer
 *           description: The base base mind points that the character starts
 *                        with
 *         mindPoints:
 *           type: integer
 *           description: Current mind points of the character - if not
 *                        provided defaults to the base mind points
 *         baseDiagonalPoints:
 *           type: integer
 *           default: 0
 *           description: The base diagonal attack points that the character
 *                        starts with
 *         baseMeleePoints:
 *           type: integer
 *           default: 0
 *           description: The base melee attack points that the character
 *                        starts with
 *         baseRangedPoints:
 *           type: integer
 *           default: 0
 *           description: The base ranged attack points that the character
 *                        starts with
 *         baseDefencePoints:
 *           type: integer
 *           default: 0
 *           description: The base defence points that the character starts with
 *         baseMovementPoints:
 *           type: integer
 *           nullable: true
 *           description: The base movement points that the character starts
 *                        with
 *         gold:
 *           type: integer
 *           default: 0
 *           description: The amount of gold the character has
 *         imageFile:
 *           type: object
 *           nullable: true
 *           description: The character's profile picture
 *           properties:
 *             type:
 *               type: string
 *             data:
 *               type: string
 *               format: binary
 *         armoryItems:
 *           type: array
 *           items:
 *             type: uuid
 *           description: The amount of gold the character has
 *       example:
 *          _id: 6274363f636ebf0013fd1235
 *          characterName: Barbarian
 *          baseBodyPoints: 7
 *          bodyPoints: 5
 *          baseMindPoints: 3
 *          mindPoints: 2
 *          baseDiagonalPoints: 0
 *          baseMeleePoints: 3
 *          baseRangedPoints: 0
 *          baseDefencePoints: 2
 *          baseMovementPoints: null
 *          gold: 500
 *          imageFile: { type: "Buffer", data: [255, 216,..., 222] }
 *          armoryItems:
 *            - 62743655636ebf0013fd123c
 *            - 627fa383d63f7b0014bdeff9
 *     PlayerCards:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/PlayerCard'
 */

const router = require("express").Router();
const PlayerCard = require("../models/player_card.model");
const ArmoryItem = require("../models/armory_item.model");
const Helper = require("./common");

const serializePlayerCard = (card) => {
  return {
    _id: card._id,
    characterName: card.characterName,
    baseBodyPoints: card.baseBodyPoints,
    bodyPoints: card.bodyPoints,
    baseMindPoints: card.baseMindPoints,
    mindPoints: card.mindPoints,
    baseMeleePoints: card.baseMeleePoints,
    baseDiagonalPoints: card.baseDiagonalPoints,
    baseRangedPoints: card.baseRangedPoints,
    baseDefencePoints: card.baseDefencePoints,
    baseMovementPoints: card.baseMovementPoints,
    gold: card.gold,
    imageFile: card.imageFile,
    armoryItems: card.armoryItems,
  };
};

/**
 * @swagger
 * /player_cards/:
 *   get:
 *     summary: Lists all the player cards
 *     tags: [Player cards]
 *     responses:
 *       "200":
 *         description: The list of all player cards
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerCards'
 */
router.route("").get((req, res) => {
  PlayerCard.find()
    .then((playerCards) =>
      res.json(playerCards.map((card) => serializePlayerCard(card)))
    )
    .catch((err) => res.status(500).send());
});

/**
 * @swagger
 * /player_cards:
 *   post:
 *     summary: Adds a new player card
 *     tags: [Player cards]
 *     responses:
 *       "201":
 *         description: New player card added
 *       "400":
 *         description: Payload has errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 */
router.route("").post((req, res) => {
  const {
    characterName,
    baseBodyPoints,
    bodyPoints,
    baseMindPoints,
    mindPoints,
    baseMeleePoints,
    baseDiagonalPoints,
    baseRangedPoints,
    baseDefencePoints,
    baseMovementPoints,
    gold,
  } = req.body;

  new PlayerCard({
    characterName: characterName,
    baseBodyPoints: Number(baseBodyPoints),
    bodyPoints: bodyPoints ? Number(bodyPoints) : Number(baseBodyPoints),
    baseMindPoints: Number(baseMindPoints),
    mindPoints: mindPoints ? Number(mindPoints) : Number(baseMindPoints),
    baseMeleePoints: baseMeleePoints ? Number(baseMeleePoints) : 0,
    baseDiagonalPoints: baseDiagonalPoints ? Number(baseDiagonalPoints) : 0,
    baseRangedPoints: baseRangedPoints ? Number(baseRangedPoints) : 0,
    baseDefencePoints: baseDefencePoints ? Number(baseDefencePoints) : 0,
    baseMovementPoints: baseMovementPoints ? Number(baseMovementPoints) : null,
    gold: gold ? Number(gold) : 0,
  })
    .save()
    .then((card) => res.status(201).send(serializePlayerCard(card)))
    .catch((err) => Helper.sendError(res, err, Helper.POST));
});

/**
 * @swagger
 * /player_cards/update_multiple:
 *   post:
 *     summary: Updates the player cards defined in the request body
 *     tags: [Player cards]
 *     requestBody:
 *       description: Key-value pairs where the key is the card ID and the
 *                    value is an object of fields to be updated
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               {
 *                 627fb4c58870a30013824faa: { bodyPoints: 5, gold: 270 },
 *                 627fb4cb8870a30013824fac: { bodyPoints: 2, gold: 100 },
 *               }
 *     responses:
 *       "200":
 *         description: Player card updated
 */
router.route("/update_multiple").post((req, res) => {
  for (var id in req.body) {
    PlayerCard.findOneAndUpdate({ _id: id }, req.body[id]).catch((err) =>
      res.status(500).send()
    );
  }

  res.send();
});

/**
 * @swagger
 * /player_cards/upload_image/{id}:
 *   post:
 *     summary: Uploads a new profile image for a player card
 *     tags: [Player cards]
 *     responses:
 *       "200":
 *         description: Image added for the player card
 *       "422":
 *         description: The file is null
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "No file uploaded" }
 *       "413":
 *         description: The file size is too large
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "File size too large." }
 *       "415":
 *         description: Invalid file type
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "Error: file type is not image." }
 */
router.route("/upload_image/:id").post((req, res) => {
  if (req.files == null) {
    return res.status(422).json({ msg: "No file uploaded" });
  }

  if (req.files.characterImage.size > 17825792) {
    return res.status(413).json({ msg: "File size too large." });
  }

  if (!/^image[/]/.test(req.files.characterImage.mimetype)) {
    return res.status(415).json({ msg: "Error: file type is not image." });
  }

  PlayerCard.findOneAndUpdate(
    { _id: req.params.id },
    {
      imageFile: new Buffer(
        req.files.characterImage.data.toString("base64"),
        "base64"
      ),
    }
  )
    .then(() => res.send())
    .catch((err) => res.status(500).send());
});

/**
 * @swagger
 * /player_cards/add_armory_item/{id}:
 *   post:
 *     summary: Adds an armory item for the character
 *     tags: [Player cards]
 *     responses:
 *       "200":
 *         description: New armory item added for the character
 *       "404":
 *         description: The armory item does not exist
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "Error: Armory item does not exist." }
 *       "409":
 *         description: The character already has the armory item
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "Error: Player card already contains the armory item." }
 *       "422":
 *         description: The armory item ID has not been provided in the URL or body
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "Error: Missing Armory Item ID" }
 */
router.route("/add_armory_item/:id").post((req, res) => {
  if (req.body.itemId === null || req.body.itemId === "")
    return res.status(422).json({ msg: "Error: Missing Armory Item ID" });

  ArmoryItem.findById(req.body.itemId, function (err, item) {
    if (item) {
      PlayerCard.findById(req.params.id, function (err, card) {
        if (card.armoryItems.includes(req.body.itemId)) {
          return res.status(409).json({
            msg: "Error: Player card already contains the armory item.",
          });
        }

        PlayerCard.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { armoryItems: req.body.itemId } }
        ).then(() => res.send());
      }).catch((err) => res.status(500).send());
    } else {
      res.status(404).json({ msg: "Error: Armory item does not exist." });
    }
  });
});

/**
 * @swagger
 * /player_cards/delete_armory_item/{id}:
 *   patch:
 *     summary: Removes an armory item from the character
 *     tags: [Player cards]
 *     responses:
 *       "200":
 *         description: Removes an armory item from the character
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlayerCard'
 *       "422":
 *         description: No ID provided
 *         content:
 *           application/json:
 *             schema:
 *             example:
 *               { msg: "Error: Missing Armory Item ID" }
 */
router.route("/delete_armory_item/:id").patch((req, res) => {
  if (!req.body.itemId)
    return res.status(422).json("Error: Missing Armory Item ID");

  PlayerCard.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { armoryItems: { $in: req.body.itemId } } }
  ).then(() => res.send());
});

/**
 * @swagger
 * /player_cards/{id}:
 *   delete:
 *     summary: Delete's a character's player card
 *     tags: [Player cards]
 *     responses:
 *       "200":
 *         description: Delete's a character's player card
 */
router.route("/:id").delete((req, res) => {
  console.log("req.params");
  PlayerCard.findByIdAndDelete(req.params.id)
    .then(() => res.send())
    .catch((err) => res.status(500).send());
});

module.exports = router;
