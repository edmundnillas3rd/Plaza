const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "Owner", required: true },
    price: { type: Number, required: true },
    description: { type: String },
    stock: { type: Number, required: true }
  },
  {
    toJSON: { virtuals: true }
  }
);

itemSchema.virtual("url").get(function () {
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
