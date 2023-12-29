const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  address: { type: Schema.Types.Mixed, required: true },
  payment: { type: String, default: "cash" },
  totalItem: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  items: { type: [Schema.Types.Mixed] },
  status: { type: String, default: "Pending" },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("order", cartSchema);
