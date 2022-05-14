const SET = "=";
const INCREASE = "+";
const DECREASE = "-";

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const armoryItemSchema = new Schema(
  {
    name: { type: String, required: true },
    meleePoints: { type: Number, required: false },
    meleeOperator: {
      type: String,
      required: false,
      enum: [SET, INCREASE, DECREASE],
    },
    rangedPoints: { type: Number, required: false },
    rangedOperator: {
      type: String,
      required: false,
      enum: [SET, INCREASE, DECREASE],
    },
    diagonalPoints: { type: Number, required: false },
    diagonalOperator: {
      type: String,
      required: false,
      enum: [SET, INCREASE, DECREASE],
    },
    defencePoints: { type: Number, required: false },
    defenceOperator: {
      type: String,
      required: false,
      enum: [SET, INCREASE, DECREASE],
    },
    movementPoints: { type: Number, required: false },
    movementOperator: {
      type: String,
      required: false,
      enum: [SET, INCREASE, DECREASE],
    },
  },
  {
    timestamps: true,
  }
);

armoryItemSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model("ArmoryItem", armoryItemSchema);
