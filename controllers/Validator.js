const jwt = require("jsonwebtoken");
const validator = async (req, res, next) => {
  let cookieValue = req.cookies.token;
  // cookieValue =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGYyZGU1OTlkYjZiN2ZkNTNiZDExNSIsImlhdCI6MTcwMzkzOTA4M30._WC3bAKe7eTobGYQyjStG24i2Dg9zHmxIg3FXvjpYFw";

  if (cookieValue) {
    const result = jwt.decode(cookieValue, process.env.SECRETE_KEY);
    req.id = result.id;
    next();
  } else {
    return res.status(400).json("NotFound");
  }
};

module.exports = validator;
