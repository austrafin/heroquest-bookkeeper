const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const playerCardSchema = new Schema(
  {
    characterName: { type: String, required: true },
    baseBodyPoints: { type: Number, required: true, min: 0 },
    bodyPoints: { type: Number, required: true, min: 0 },
    baseMindPoints: { type: Number, required: true, min: 0 },
    mindPoints: { type: Number, required: true, min: 0 },
    baseMeleePoints: { type: Number, required: true, default: 0, min: 0 },
    baseDiagonalPoints: { type: Number, required: true, default: 0, min: 0 },
    baseRangedPoints: { type: Number, required: true, default: 0, min: 0 },
    baseDefencePoints: { type: Number, required: true, default: 0, min: 0 },
    baseMovementPoints: { type: Number, required: false },
    gold: { type: Number, required: true, default: 0, min: 0 },
    armoryItems: [{ type: mongoose.ObjectId }],
    imageFile: { type: Buffer, required: false },
  },
  {
    timestamps: true,
  }
);

const PlayerCard = mongoose.model("PlayerCard", playerCardSchema);

module.exports = PlayerCard;
