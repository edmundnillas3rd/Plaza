const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

module.exports = mongoose.model("Review", reviewSchema);
