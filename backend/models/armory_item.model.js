const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const armoryItemSchema = new Schema(
  {
    name: { type: String, required: true },
    meleePoints: { type: Number, required: false },
    meleeOperator: { type: String, required: false },
    rangedPoints: { type: Number, required: false },
    rangedOperator: { type: String, required: false },
    diagonalPoints: { type: Number, required: false },
    diagonalOperator: { type: String, required: false },
    defencePoints: { type: Number, required: false },
    defenceOperator: { type: String, required: false },
    movementPoints: { type: Number, required: false },
    movementOperator: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const ArmoryItem = mongoose.model("ArmoryItem", armoryItemSchema);

module.exports = ArmoryItem;
