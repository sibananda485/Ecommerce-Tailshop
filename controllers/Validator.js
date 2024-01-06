const jwt = require("jsonwebtoken");
const validator = async (req, res, next) => {
  let cookieValue = req.cookies.token;
  // cookieValue =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTAyOTYzYmM2Y2QxY2NiYjg3NTliMCIsImlhdCI6MTcwNDU0MTQwN30.g5sQYzKkkiY8vF5nj3_6xGL6YWpnxewQ6sDwEcsp5tk";

  if (cookieValue) {
    const result = jwt.decode(cookieValue, process.env.SECRETE_KEY);
    req.id = result.id;
    next();
  } else {
    return res.status(400).json("NotFound");
  }
};

module.exports = validator;
