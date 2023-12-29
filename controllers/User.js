const User = require("../models/User");

const updateUserById = async (req, res) => { 
  try {
    const docs = await User.findByIdAndUpdate(req.id, req.body, {
      new: true,
    });
    res.status(201).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const docs = await User.findById(req.id);
    res.status(201).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { updateUserById, getUserById };
