const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  quantity: { type: Number, required: true },
  product:{type:Schema.Types.ObjectId,ref:"product"},
  user:{type:Schema.Types.ObjectId,ref:"user"}
});

const virtual  = cartSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

module.exports = mongoose.model("cart", cartSchema);
