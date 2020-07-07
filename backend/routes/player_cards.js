const router = require("express").Router();
const PlayerCard = require("../models/player_card.model");
const ArmoryItem = require("../models/armory_item.model");

router.route("").get((req, res) => {
  PlayerCard.find()
    .then((playerCards) => {
      const response = [];
      playerCards.forEach((card) => {
        const cardsResponse = {};
        cardsResponse["_id"] = card._id;
        cardsResponse["characterName"] = card.characterName;
        cardsResponse["baseBodyPoints"] = card.baseBodyPoints;
        cardsResponse["bodyPoints"] = card.bodyPoints;
        cardsResponse["baseMindPoints"] = card.baseMindPoints;
        cardsResponse["mindPoints"] = card.mindPoints;
        cardsResponse["baseMeleePoints"] = card.baseMeleePoints;
        cardsResponse["baseDiagonalPoints"] = card.baseDiagonalPoints;
        cardsResponse["baseRangedPoints"] = card.baseRangedPoints;
        cardsResponse["baseDefencePoints"] = card.baseDefencePoints;
        cardsResponse["baseMovementPoints"] = card.baseMovementPoints;
        cardsResponse["gold"] = card.gold;
        cardsResponse["imageFile"] = card.imageFile;
        cardsResponse["armoryItems"] = card.armoryItems;

        response.push(cardsResponse);
      });
      res.json(response);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  new PlayerCard({
    characterName: req.body.characterName,
    baseBodyPoints: Number(req.body.baseBodyPoints) || 0,
    bodyPoints:
      Number(req.body.bodyPoints) || Number(req.body.baseBodyPoints) || 0,
    baseMindPoints: Number(req.body.baseMindPoints) || 0,
    mindPoints:
      Number(req.body.mindPoints) || Number(req.body.baseMindPoints) || 0,
    baseMeleePoints: Number(req.body.baseMeleePoints) || 0,
    baseDiagonalPoints: Number(req.body.baseDiagonalPoints) || 0,
    baseRangedPoints: Number(req.body.baseRangedPoints) || 0,
    baseDefencePoints: Number(req.body.baseDefencePoints) || 0,
    baseMovementPoints: Number(req.body.baseMovementPoints) || 0,
    gold: Number(req.body.gold) || 0,
  })
    .save()
    .then(() => res.status(201).json("Player card added"))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/update").post((req, res) => {
  for (var id in req.body) {
    PlayerCard.findOneAndUpdate({ _id: id }, req.body[id]).catch((err) =>
      res.status(500).json("Error: " + err)
    );
  }

  res.json("Player cards updated");
});

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
    .then(() => res.json("Character image uploaded."))
    .catch((err) => res.status(500).json("Error: " + err));
});

router.route("/add_armory_item/:id").post((req, res) => {
  if (req.body.itemId === null || req.body.itemId === "")
    return res.status(422).json("Error: Missing Armory Item ID");

  ArmoryItem.findById(req.body.itemId, function (err, item) {
    if (item) {
      PlayerCard.findById(req.params.id, function (err, card) {
        if (card.armoryItems.includes(req.body.itemId)) {
          return res
            .status(409)
            .json("Error: Player card already contains the armory item.");
        }

        PlayerCard.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { armoryItems: req.body.itemId } }
        ).then(() => res.json("Armory item added"));
      }).catch((err) => res.status(500).json("Error: " + err));
    } else {
      res.status(404).json("Error: Armory item does not exist.");
    }
  });
});

router.route("/:id").delete((req, res) => {
  console.log("req.params");
  PlayerCard.findByIdAndDelete(req.params.id)
    .then(() => res.json("PlayerCard deleted."))
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
