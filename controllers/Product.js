const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getchAllProduct = async (req, res) => {
  let mongoQuery = Product.find({});
  let totalDocCountQuery = Product.find({})
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

const getProductById = async (req, res) => {
  try {
    const docs = await Product.findOne({_id:req.params.id});
    res.status(200).json(docs);
  } catch (error) {
    res.json(400).json(error);
  }
};

const updateProductById = async (req, res) => {
  try {
    const docs = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(201).json(docs);
  } catch (error) {
    res.json(400).json(error);
  }
};

module.exports = { createProduct, getchAllProduct,getProductById,updateProductById };
