const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    image: {
      urls: [{ type: String }]
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

itemSchema.virtual("url").get(function () {
  return `/inventory/items/${this._id}`;
});

module.exports = mongoose.model("Item", itemSchema);
