const router = require("express").Router();
const ArmoryItem = require("../models/armory_item.model");
const PlayerCard = require("../models/player_card.model");

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

router.route("/get_ids").get((req, res) => {
  ArmoryItem.find()
    .then((armoryItems) => {
      const ids = [];
      armoryItems.forEach((item) => {
        ids.push(item._id);
      });
      res.json(ids);
    })
    .catch((err) => res.status(500).json("Error: " + err));
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
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/add").post((req, res) => {
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
    .then(() => res.status(201).json("Armory item added"))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ArmoryItem.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then(() => res.json("Armory item updated"))
    .catch((err) => {
      res.status(500).json("Error: " + err);
    });
});

router.route("/:id").get((req, res) => {
  ArmoryItem.find({ _id: req.params.id })
    .then((armoryItem) => res.json(armoryItem))
    .catch((err) => res.status(500).json("Error: " + err));
});

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

      res.json("Armory Item deleted.");
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
