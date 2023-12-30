const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const process.env.SECRETE_KEY = "siba";

const createUser = async (req, res) => {
  try {
    const docs = await User.findOne({ email: req.body.email });
    if (docs?.length >= 1) {
      return res.status(400).json({ message: "user exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    let token = await jwt.sign({ id: result.id }, process.env.SECRETE_KEY);
    let minute = 90071992547409;
    // res.cookie("token", token, { maxAge: minute });
    // return res.status(200).json(docs);
    return res
      .status(201)
      .cookie("token", token, { maxAge: minute })
      .json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const docs = await User.findOne({ email: req.body.email });
    const verify = await bcrypt.compare(req.body.password, docs.password);
    if (verify) {
      let token = await jwt.sign({ id: docs.id }, process.env.SECRETE_KEY);
      let minute = 90071992547409;
      return res
        .status(200)
        .cookie("token", token, { maxAge: minute })
        .json(docs);
    } else {
      res.status(401).json({ message: "password invalid" });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid details" });
  }
};

const getUserFromToken = async (req, res) => {
  let cookieValue = req.cookies.token;
  // cookieValue =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGYyZGU1OTlkYjZiN2ZkNTNiZDExNSIsImlhdCI6MTcwMzkzOTA4M30._WC3bAKe7eTobGYQyjStG24i2Dg9zHmxIg3FXvjpYFw";
  if (cookieValue) {
    const result = jwt.decode(cookieValue, process.env.SECRETE_KEY);
    const docs = await User.findById(result.id);
    return res.status(200).json(docs);
  } else {
    return res.status(400).json("NotFound");
  }
};

module.exports = { createUser, loginUser, getUserFromToken };
