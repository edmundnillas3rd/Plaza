const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

itemSchema.virtual("url").get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
