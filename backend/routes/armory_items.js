/**
 * @swagger
 * tags:
 *   name: Armory items
 *   description: API to manage armory items in the game.
 * components:
 *   schemas:
 *     ArmoryItem:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         defenceOperator:
 *           type: string
 *           nullable: true
 *           description: Determines the effect of the item on the character's
 *                        defence points.
 *         defencePoints:
 *           type: integer
 *           nullable: true
 *           description: The number of defence points that are either set,
 *                        decreased or increased on the character wearing the
 *                        item
 *         diagonalOperator:
 *           type: string
 *           nullable: true
 *           description: Determines the effect of the item on the character's
 *                        diagonal attack points.
 *         diagonalPoints:
 *           type: integer
 *           nullable: true
 *           description: The number of diagonal attack points that are either
 *                        set, decreased or increased on the character wearing
 *                        the item
 *         meleeOperator:
 *           type: string
 *           nullable: true
 *           description: Determines the effect of the item on the character's
 *                        melee attack points.
 *         meleePoints:
 *           type: integer
 *           nullable: true
 *           description: The number of melee attack points that are either
 *                        set, decreased or increased on the character wearing
 *                        the item
 *         movementOperator:
 *           type: string
 *           nullable: true
 *           description: Determines the effect of the item on the character's
 *                        movement points.
 *         movementPoints:
 *           type: integer
 *           nullable: true
 *           description: The number of movement points that are either set,
 *                        decreased or increased on the character wearing the
 *                        item
 *         name:
 *           type: string
 *           nullable: true
 *           description: The name of the item
 *         rangedOperator:
 *           type: string
 *           nullable: true
 *           description: Determines the effect of the item on the character's
 *                        ranged attack points.
 *         rangedPoints:
 *           type: integer
 *           nullable: true
 *           description: The number of ranged attack points that are either
 *                        set, decreased or increased on the character wearing
 *                        the item
 *       example:
 *          defenceOperator: +
 *          defencePoints: 1
 *          diagonalOperator: +
 *          diagonalPoints: 1
 *          meleeOperator: +
 *          meleePoints: 3
 *          movementOperator: "-"
 *          movementPoints: 1
 *          name: Long sword
 *          rangedOperator: null
 *          rangedPoints: null
 *     ArmoryItems:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ArmoryItem'
 *
 */

const router = require("express").Router();
const ArmoryItem = require("../models/armory_item.model");
const PlayerCard = require("../models/player_card.model");

/**
 * @swagger
 * /armory_items/:
 *   get:
 *     summary: Lists all the armory items
 *     tags: [Armory items]
 *     responses:
 *       "200":
 *         description: The list of all armory items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArmoryItems'
 */
router.route("").get((req, res) => {
  ArmoryItem.find()
    .then((armoryItems) => {
      const response = [];
      armoryItems.forEach((item) => {
        const armoryItemResponse = {};
        armoryItemResponse["_id"] = item._id;
        armoryItemResponse["defenceOperator"] = item.defenceOperator;
        armoryItemResponse["defencePoints"] = item.defencePoints;
        armoryItemResponse["diagonalOperator"] = item.diagonalOperator;
        armoryItemResponse["diagonalPoints"] = item.diagonalPoints;
        armoryItemResponse["meleeOperator"] = item.meleeOperator;
        armoryItemResponse["meleePoints"] = item.meleePoints;
        armoryItemResponse["movementOperator"] = item.movementOperator;
        armoryItemResponse["movementPoints"] = item.movementPoints;
        armoryItemResponse["name"] = item.name;
        armoryItemResponse["rangedOperator"] = item.rangedOperator;
        armoryItemResponse["rangedPoints"] = item.rangedPoints;

        response.push(armoryItemResponse);
      });

      res.json(response);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /armory_items/{id}:
 *   get:
 *     summary: Returns an armory item by its ID
 *     tags: [Armory items]
 *     responses:
 *       "200":
 *         description: The armory item by the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArmoryItem'
 */
router.route("/:id").get((req, res) => {
  ArmoryItem.find({ _id: req.params.id })
    .then((armoryItem) => res.json(armoryItem))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /armory_items/:
 *   post:
 *     summary: Adds a new armory item
 *     tags: [Armory items]
 *     responses:
 *       "201":
 *         description: New armory item added
 */
router.route("").post((req, res) => {
  new ArmoryItem({
    name: req.body.name,
    meleePoints: req.body.meleePoints,
    meleeOperator: req.body.meleeOperator,
    rangedPoints: req.body.rangedPoints,
    rangedOperator: req.body.rangedOperator,
    diagonalPoints: req.body.diagonalPoints,
    diagonalOperator: req.body.diagonalOperator,
    defencePoints: req.body.defencePoints,
    defenceOperator: req.body.defenceOperator,
    movementPoints: req.body.movementPoints,
    movementOperator: req.body.movementOperator,
  })
    .save()
    .then(() => res.status(201).send())
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /armory_items/{id}:
 *   patch:
 *     summary: Updates an armory item
 *     tags: [Armory items]
 *     responses:
 *       "200":
 *         description: Armory item updated
 */
router.route("/:id").patch((req, res) => {
  ArmoryItem.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(() => res.send())
    .catch((err) => {
      res.status(500).json("Error: " + err);
    });
});

/**
 * @swagger
 * /armory_items/{id}:
 *   delete:
 *     summary: Deletes an armory item
 *     tags: [Armory items]
 *     responses:
 *       "200":
 *         description: Armory item deleted
 */
router.route("/:id").delete((req, res) => {
  ArmoryItem.findByIdAndDelete(req.params.id)
    .then(() => {
      PlayerCard.updateMany(
        { armoryItems: req.params.id },
        {
          $pullAll: {
            armoryItems: [req.params.id],
          },
        }
      ).then(() => {
        // Why does this need to be here for the deletion to work???
      });

      res.send();
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
