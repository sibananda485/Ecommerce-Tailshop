const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "wrong min price"],
    max: [300000, "wrong max price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "wrong min discountPercentage"],
    max: [80, "wrong max discountPercentage"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "wrong min stock"],
    max: [500, "wrong max stock"],
  },
  rating: {
    type: Number,
    min: [0, "wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

const virtual  = ProductSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
ProductSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

module.exports = mongoose.model("product", ProductSchema);
