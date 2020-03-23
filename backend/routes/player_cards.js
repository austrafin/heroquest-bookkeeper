const router = require("express").Router();
let PlayerCard = require("../models/player_card.model");

router.route("").get((req, res) => {
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
    .then(() => res.json("Player card added"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  const fs = require("mz/fs");

  fs.readFile("./burger.png").then(data => {
    for (var id in req.body) {
      let base64 = data.toString("base64");
      let imageBuffer = new Buffer(base64, "base64");

      const values = req.body[id];
      values["imageFile"] = imageBuffer;
      console.log(id);

      PlayerCard.findOneAndUpdate({ _id: id }, values).catch(err =>
        res.status(400).json("Error: " + err)
      );
    }
  });

  res.json("Player cards updated");
});

/*
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
*/

module.exports = router;
