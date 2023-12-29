const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean, required: true },
});

module.exports = mongoose.model("category",CategorySchema)