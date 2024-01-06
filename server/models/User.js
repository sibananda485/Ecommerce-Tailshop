const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default:"user"},
  name: { type: String },
  address: { type: [Schema.Types.Mixed] },
  orders: { type: [Schema.Types.Mixed] },
});

const virtual  = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

module.exports = mongoose.model("user", userSchema);
