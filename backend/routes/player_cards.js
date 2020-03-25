const router = require("express").Router();
const PlayerCard = require("../models/player_card.model");

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
  for (var id in req.body) {
    PlayerCard.findOneAndUpdate({ _id: id }, req.body[id]).catch(err =>
      res.status(400).json("Error: " + err)
    );
  }

  res.json("Player cards updated");
});

router.route("/upload_image/:id").post((req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  PlayerCard.findOneAndUpdate(
    { _id: req.params.id },
    {
      imageFile: new Buffer(
        req.files.characterImage.data.toString("base64"),
        "base64"
      )
    }
  ).catch(err => res.status(400).json("Error: " + err));
  res.json("Character image uploaded.");
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
