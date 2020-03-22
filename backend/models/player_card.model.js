const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const playerCardSchema = new Schema(
  {
    characterName: { type: String, required: true },
    bodyPoints: { type: Number, required: true },
    mindPoints: { type: Number, required: true },
    attackPoints: { type: Number, required: true },
    defencePoints: { type: Number, required: true },
    movementPoints: { type: Number, required: true },
    gold: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const PlayerCard = mongoose.model("PlayerCard", playerCardSchema);

module.exports = PlayerCard;
