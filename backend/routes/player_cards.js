const router = require("express").Router();
let PlayerCard = require("../models/player_card.model");

router.route("/").get((req, res) => {
  PlayerCard.find()
    .then(playerCards => res.json(playerCards))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const characterName = req.body.characterName;
  const bodyPoints = Number(req.body.bodyPoints);
  const mindPoints = Number(req.body.mindPoints);
  const attackPoints = Number(req.body.attackPoints);
  const defencePoints = Number(req.body.defencePoints);
  const movementPoints = Number(req.body.movementPoints);
  const gold = Number(req.body.gold);

  const newPlayerCard = new PlayerCard({
    characterName,
    bodyPoints,
    mindPoints,
    attackPoints,
    defencePoints,
    movementPoints,
    gold
  });

  newPlayerCard
    .save()
    .then(() => res.json("PlayerCard added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("").get((req, res) => {
  PlayerCard.find({})
    .then(playerCard => res.json(playerCard))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:characterName").get((req, res) => {
  PlayerCard.find({ characterName: req.params.characterName })
    .then(playerCard => res.json(playerCard))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  PlayerCard.findByIdAndDelete(req.params.id)
    .then(() => res.json("PlayerCard deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  PlayerCard.findById(req.params.id)
    .then(playerCard => {
      playerCard.characterName = req.body.characterName;
      playerCard.bodyPoints = Number(req.body.bodyPoints);
      playerCard.mindPoints = Number(req.body.mindPoints);
      playerCard.attackPoints = Number(req.body.attackPoints);
      playerCard.defencePoints = Number(req.body.defencePoints);
      playerCard.movementPoints = Number(req.body.movementPoints);
      playerCard.gold = Number(req.body.gold);

      playerCard
        .save()
        .then(() => res.json("PlayerCard updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
