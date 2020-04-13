const mongoose = require("mongoose");
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
    meleePoints: { type: Number, required: true },
    baseDiagonalPoints: { type: Number, required: true },
    diagonalPoints: { type: Number, required: true },
    baseRangedPoints: { type: Number, required: true },
    rangedPoints: { type: Number, required: true },
    baseDefencePoints: { type: Number, required: true },
    defencePoints: { type: Number, required: true },
    baseMovementPoints: { type: Number, required: true },
    movementPoints: { type: Number, required: true },
    gold: { type: Number, required: true },
    armoryItems: [{ type: Object, required: false }],
    imageFile: { type: Buffer, required: false },
  },
  {
    timestamps: true,
  }
);

const PlayerCard = mongoose.model("PlayerCard", playerCardSchema);

module.exports = PlayerCard;
