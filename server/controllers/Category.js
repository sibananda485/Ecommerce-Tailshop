const Category = require("../models/Category");

const getAllCategory = async (req, res) => {
  try {
    const docs = await Category.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.json(400).json(error);
  }
};

const createCategory = async (req, res) => {
    try {
      const result = await Category.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

module.exports = {getAllCategory,createCategory}