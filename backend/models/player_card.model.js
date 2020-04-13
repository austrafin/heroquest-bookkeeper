const mongoose = require("mongoose");
const ArmoryItem = require("../models/armory_item.model").schema;
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const playerCardSchema = new Schema(
  {
    characterName: { type: String, required: true },
    baseBodyPoints: { type: Number, required: true },
    bodyPoints: { type: Number, required: true },
    baseMindPoints: { type: Number, required: true },
    mindPoints: { type: Number, required: true },
    baseMeleePoints: { type: Number, required: true },
    baseDiagonalPoints: { type: Number, required: true },
    baseRangedPoints: { type: Number, required: true },
    baseDefencePoints: { type: Number, required: true },
    baseMovementPoints: { type: Number, required: true },
    gold: { type: Number, required: true },
    armoryItems: [ArmoryItem],
    imageFile: { type: Buffer, required: false },
  },
  {
    timestamps: true,
  }
);

const PlayerCard = mongoose.model("PlayerCard", playerCardSchema);

module.exports = PlayerCard;
