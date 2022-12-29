const mongoose = require("mongoose");
const { Schema } = mongoose;

const ownerSchema = new Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model("Owner", ownerSchema);
