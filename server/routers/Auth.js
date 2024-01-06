const express = require("express");
const { createUser, loginUser ,getUserFromToken} = require("../controllers/Auth");
const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/cookie", getUserFromToken);

module.exports = router;
