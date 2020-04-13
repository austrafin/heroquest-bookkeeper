const router = require("express").Router();
const mongoose = require("mongoose");
const ArmoryItem = require("../models/armory_item.model");
const PlayerCard = require("../models/player_card.model");

router.route("").get((req, res) => {
  ArmoryItem.find()
    .then((armoryItems) => res.json(armoryItems))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get_ids").get((req, res) => {
  ArmoryItem.find()
    .then((armoryItems) => {
      const ids = [];
      armoryItems.forEach((item) => {
        ids.push(item._id);
      });
      res.json(ids);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/get_names").get((req, res) => {
  ArmoryItem.find()
    .then((armoryItems) => {
      const names = {};
      armoryItems.forEach((item) => {
        names[item._id] = item.name;
      });
      res.json(names);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const meleePoints = "meleePoints" in req.body ? req.body.meleePoints : null;
  const meleeOperator =
    "meleeOperator" in req.body ? req.body.meleeOperator : null;
  const rangedPoints =
    "rangedPoints" in req.body ? req.body.rangedPoints : null;
  const rangedOperator =
    "rangedOperator" in req.body ? req.body.rangedOperator : null;
  const diagonalPoints =
    "diagonalPoints" in req.body ? req.body.diagonalPoints : null;
  const diagonalOperator =
    "diagonalOperator" in req.body ? req.body.diagonalOperators : null;
  const defencePoints =
    "defencePoints" in req.body ? req.body.defencePoints : null;
  const defenceOperator =
    "defenceOperator" in req.body ? req.body.defenceOperator : null;
  const movementPoints =
    "movementPoints" in req.body ? req.body.movementPoints : null;
  const movementOperator =
    "movementOperator" in req.body ? req.body.movementOperator : null;

  const newArmoryItem = new ArmoryItem({
    name,
    meleePoints,
    meleeOperator,
    rangedPoints,
    rangedOperator,
    diagonalPoints,
    diagonalOperator,
    defencePoints,
    defenceOperator,
    movementPoints,
    movementOperator,
  });

  newArmoryItem
    .save()
    .then(() => res.json("Armory item added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  let session = null;
  mongoose.startSession().then((_session) => {
    session = _session;
    session.startTransaction();

    ArmoryItem.findOneAndUpdate({ _id: req.params.id }, req.body)
      .session(session)
      .then((item) => {
        PlayerCard.find({
          armoryItems: { $elemMatch: { id: req.params.id } },
        }).then((playerCards) => {
          playerCards.forEach((card) => {
            const values = {
              addMelee: 0,
              meleeTotal: card.baseMeleePoints,
              addDiagonal: 0,
              diagonalTotal: card.baseDiagonalPoints,
              addRanged: 0,
              rangedTotal: card.baseRangedPoints,
              addDefence: 0,
              defenceTotal: card.baseDefencePoints,
              addMovement: 0,
              movementTotal: card.baseMovementPoints,
            };

            const newValues = {};

            card.armoryItems.forEach((cardArmoryItem) => {
              ArmoryItem.findOne({ _id: cardArmoryItem.id })
                .then((ai) => {
                  calculateValue(
                    ai,
                    values,
                    newValues,
                    "meleePoints",
                    "addMelee",
                    "meleeTotal",
                    "meleeOperator"
                  );
                  calculateValue(
                    ai,
                    values,
                    newValues,
                    "rangedPoints",
                    "addRanged",
                    "rangedTotal",
                    "rangedOperator"
                  );
                  calculateValue(
                    ai,
                    values,
                    newValues,
                    "diagonalPoints",
                    "addDiagonal",
                    "diagonalTotal",
                    "diagonalOperator"
                  );
                  calculateValue(
                    ai,
                    values,
                    newValues,
                    "defencePoints",
                    "addDefence",
                    "defenceTotal",
                    "defenceOperator"
                  );
                  calculateValue(
                    ai,
                    values,
                    newValues,
                    "movementPoints",
                    "addMovement",
                    "movementTotal",
                    "movementOperator"
                  );
                })
                .then(() => {
                  PlayerCard.findOneAndUpdate({ _id: card._id }, newValues)
                    .session(session)
                    .then(() => {
                      session.commitTransaction();
                      res.json("Armory item updated");
                    });
                });
            });
          });
        });
      })
      .catch((err) => {
        session.abortTransaction();
        res.status(400).json("Error: " + err);
      });
  });
});

router.route("/:id").get((req, res) => {
  ArmoryItem.find({ _id: req.params.id })
    .then((armoryItem) => res.json(armoryItem))
    .catch((err) => res.status(400).json("Error: " + err));
});

function calculateValue(
  obj,
  values,
  newValues,
  pointsKey,
  addKey,
  totalKey,
  operatorKey
) {
  if (obj[operatorKey] === "=" && obj[pointsKey] > values[totalKey]) {
    values[totalKey] = obj[pointsKey];
  } else if (obj[pointsKey] !== null) {
    if (obj[operatorKey] === "+") {
      values[addKey] += obj[pointsKey];
    } else if (obj[operatorKey] === "-") {
      values[addKey] -= obj[pointsKey];
    }
  }
  newValues[pointsKey] = values[totalKey] + values[addKey];
}

module.exports = router;
