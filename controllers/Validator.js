const jwt = require("jsonwebtoken");
const validator = async (req, res, next) => {
  const cookieValue = req.cookies.token;
  // const cookieValue =
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGRkMDVmM2YwYzg1YWZjNTUwYmFlOSIsImlhdCI6MTcwMzc5MjgxOX0.q2qDkiAQBRyvkiy38jXEbTDjPrvX5ur43fEe09FWvAA";

  if (cookieValue) {
    const result = jwt.decode(cookieValue, process.env.SECRETE_KEY);
    req.id = result.id;
    next();
  } else {
    return res.status(400).json("NotFound");
  }
};

module.exports = validator;
