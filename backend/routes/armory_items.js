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
 */

const router = require("express").Router();
const ArmoryItem = require("../models/armory_item.model");
const PlayerCard = require("../models/player_card.model");
const Helper = require("./common");

const serializeArmoryItem = (item) => {
  return {
    _id: item._id,
    defenceOperator: item.defenceOperator,
    defencePoints: item.defencePoints,
    diagonalOperator: item.diagonalOperator,
    diagonalPoints: item.diagonalPoints,
    meleeOperator: item.meleeOperator,
    meleePoints: item.meleePoints,
    movementOperator: item.movementOperator,
    movementPoints: item.movementPoints,
    name: item.name,
    rangedOperator: item.rangedOperator,
    rangedPoints: item.rangedPoints,
  };
};

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
    .then((armoryItems) =>
      res.json(armoryItems.map((item) => serializeArmoryItem(item)))
    )
    .catch((err) => res.status(500).send());
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
 *       "404":
 *         description: The armory item is not found with the given ID
 */
router.route("/:id").get((req, res) => Helper.getObject(ArmoryItem, req, res));

/**
 * @swagger
 * /armory_items/:
 *   post:
 *     summary: Adds a new armory item
 *     tags: [Armory items]
 *     responses:
 *       "201":
 *         description: New armory item added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ArmoryItem'
 *       "400":
 *         description: Payload has errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
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
    .then((item) => res.status(201).send(serializeArmoryItem(item)))
    .catch((err) => Helper.sendError(res, err, Helper.POST));
});

/**
 * @swagger
 * /armory_items/{id}:
 *   patch:
 *     summary: Updates an armory item
 *     tags: [Armory items]
 *     responses:
 *       "204":
 *         description: Armory item updated
 *       "400":
 *         description: Payload has errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GenericError'
 *       "404":
 *         description: The armory item is not found with the given ID
 *
 */
router.route("/:id").patch((req, res) => {
  const query = { _id: req.params.id };

  ArmoryItem.exists(query)
    .then((exists) => {
      if (!exists) {
        res.send(404);
        return;
      }

      ArmoryItem.findOneAndUpdate(query, req.body, {
        new: true,
      })
        .then(() => res.send(204))
        .catch((err) => Helper.sendError(res, err, Helper.PATCH));
    })
    .catch((err) => Helper.sendError(res, err, Helper.PATCH));
});

/**
 * @swagger
 * /armory_items/{id}:
 *   delete:
 *     summary: Deletes an armory item
 *     tags: [Armory items]
 *     responses:
 *       "204":
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
      );

      res.send(204);
    })
    .catch((err) => Helper.sendError(res, err, Helper.DELETE));
});

module.exports = router;
