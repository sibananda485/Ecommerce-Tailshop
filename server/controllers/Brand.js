const Brand = require("../models/Brand");

const getAllBrand = async (req, res) => {
  try {
    const docs = await Brand.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.json(400).json(error);
  }
};

const createBrand = async (req, res) => {
    try {
      const result = await Brand.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

module.exports = {getAllBrand,createBrand}