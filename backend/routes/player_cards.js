const router = require("express").Router();
const PlayerCard = require("../models/player_card.model");

router.route("").get((req, res) => {
  PlayerCard.find()
    .then((playerCards) => res.json(playerCards))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update_armory_points").post((req, res) => {
  PlayerCard.find({
    armoryItems: { $elemMatch: { id: req.body.id } },
  })
    .then((playerCards) => res.json(playerCards.length))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const characterName = req.body.characterName;
  const baseBodyPoints = Number(req.body.baseBodyPoints);
  const bodyPoints = Number(req.body.bodyPoints);
  const baseMindPoints = Number(req.body.baseMindPoints);
  const mindPoints = Number(req.body.mindPoints);
  const baseMeleePoints = Number(req.body.baseMeleePoints);
  const meleePoints = Number(req.body.meleePoints);
  const baseDiagonalPoints = Number(req.body.baseDiagonalPoints);
  const diagonalPoints = Number(req.body.diagonalPoints);
  const baseRangedPoints = Number(req.body.baseRangedPoints);
  const rangedPoints = Number(req.body.rangedPoints);
  const baseDefencePoints = Number(req.body.baseDefencePoints);
  const defencePoints = Number(req.body.defencePoints);
  const baseMovementPoints = Number(req.body.baseMovementPoints);
  const movementPoints = Number(req.body.movementPoints);
  const gold = Number(req.body.gold);

  const newPlayerCard = new PlayerCard({
    characterName,
    baseBodyPoints,
    bodyPoints,
    baseMindPoints,
    mindPoints,
    baseMeleePoints,
    meleePoints,
    baseDiagonalPoints,
    diagonalPoints,
    baseRangedPoints,
    rangedPoints,
    baseDefencePoints,
    defencePoints,
    baseMovementPoints,
    movementPoints,
    gold,
  });

  newPlayerCard
    .save()
    .then(() => res.json("Player card added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  for (var id in req.body) {
    PlayerCard.findOneAndUpdate({ _id: id }, req.body[id]).catch((err) =>
      res.status(400).json("Error: " + err)
    );
  }

  res.json("Player cards updated");
});

router.route("/upload_image/:id").post((req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  if (req.files.characterImage.size > 17825792) {
    return res.status(400).json({ msg: "File size too large." });
  }

  if (!/^image[/]/.test(req.files.characterImage.mimetype)) {
    return res.status(400).json({ msg: "Error: file type is not image." });
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
    .then(() => res.json("Character image uploaded."))
    .catch((err) => res.status(400).json("Error: " + err));
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
