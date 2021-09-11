const mongoose = require("mongoose");

const packSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("package", packSchema);
