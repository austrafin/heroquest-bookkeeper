const router = require("express").Router();
const ArmoryItem = require("../models/armory_item.model");

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

  console.log(newArmoryItem);

  newArmoryItem
    .save()
    .then(() => res.json("Armory item added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  ArmoryItem.findOneAndUpdate({ _id: req.params.id }, req.body).catch((err) =>
    res.status(400).json("Error: " + err)
  );

  res.json("Armory item updated");
});

router.route("/:id").get((req, res) => {
  ArmoryItem.find({ _id: req.params.id })
    .then((armoryItem) => res.json(armoryItem))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
