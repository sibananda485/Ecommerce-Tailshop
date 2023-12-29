const jwt = require("jsonwebtoken");
const validator = async (req, res, next) => {
  let cookieValue = req.cookies.token;
  // cookieValue =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGYyZGU1OTlkYjZiN2ZkNTNiZDExNSIsImlhdCI6MTcwMzg4NTEwMX0.yGxCrJjCrhkBl1WeyLLMacyBoT6YyhXpWtUmZ90mz0k";

  if (cookieValue) {
    const result = jwt.decode(cookieValue, process.env.SECRETE_KEY);
    req.id = result.id;
    next();
  } else {
    return res.status(400).json("NotFound");
  }
};

module.exports = validator;
