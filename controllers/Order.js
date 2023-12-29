const Order = require("../models/Order");

const getOrderByUserId = async (req, res) => {
  try {
    let q = Order.find({ user: req.id });
    q = q.populate("user");
    const docs = await q.exec();
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllOrder = async (req, res) => {
  let mongoQuery = Order.find({});
  let totalDocCountQuery = Order.find({})
  for (const key in req.query) {
    if (!(key === "_sort" || key === "_order" ||  key === "_page" ||  key === "_limit")) {
      if(Array.isArray(req.query[key])){
          mongoQuery = mongoQuery.find({[key] : { $in : req.query[key]}})
          totalDocCountQuery = totalDocCountQuery.find({[key] : { $in : req.query[key]}})
        }
        else {
          mongoQuery = mongoQuery.find({[key] : req.query[key]})
          totalDocCountQuery = totalDocCountQuery.find({[key] : req.query[key]})
      }
    } 
  }
  const totalDocs = await totalDocCountQuery.count().exec()
  if (req.query._sort && req.query._order) {
    mongoQuery = mongoQuery.sort({[req.query._sort]:req.query._order})
  }
  if (req.query._page && req.query._limit) {
    const pageSize = req.query._limit
    const page = req.query._page
    mongoQuery = mongoQuery.skip(pageSize*(page-1)).limit(pageSize)
  }
  try {
    const result = await mongoQuery.exec();
    res.set("X-Total-Count",totalDocs)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const createOrder = async (req, res) => {
  try {
    const q = await Order.create({...req.body,user:req.id});
    const docs = await Order.findById(q._id).populate("user");
    return res.status(201).json(docs);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//

const updateOrderItemById = async (req, res) => {
  try {
    const docs = await Order.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    return res.status(201).json(docs);
  } catch (error) {
    return res.status(400).json(error);
  }
}; 

module.exports = {
  getOrderByUserId,
  createOrder,
  updateOrderItemById,
  getAllOrder
};

