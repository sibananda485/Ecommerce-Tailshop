const Cart = require("../models/Cart");

const getCartByUserId = async (req, res) => {
  try {
    let q = Cart.find({ user: req.id });
    q = q.populate("user");
    q = q.populate("product");
    const docs = await q.exec();

    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addToCart = async (req, res) => {
  try {
    const q = await Cart.create({...req.body,user:req.id});
    const docs = await Cart.findById(q._id)
      .populate("user")
      .populate("product");

    return res.status(201).json(docs);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const delteCartItemById = async (req, res) => {
  try {
    const docs = await Cart.findByIdAndDelete(req.params.id);
    return res.status(201).json(docs);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const updateCartItemById = async (req, res) => {
  try {
    const docs = await Cart.findByIdAndUpdate(req.params.id, req.body,{returnDocument:'after'});
    return res.status(201).json(docs);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {
  getCartByUserId,
  addToCart,
  delteCartItemById,
  updateCartItemById,
};
