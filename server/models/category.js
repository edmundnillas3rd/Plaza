const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, default: "/" },
  iconUrl: { type: String, default: "/" }
});

module.exports = mongoose.model("Category", categorySchema);
