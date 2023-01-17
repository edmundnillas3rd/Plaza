const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orders: [
    {
      item: { type: Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number }
    }
  ]
});

module.exports = mongoose.model("Order", orderSchema);
