const express = require("express");
const { updateUserById, getUserById } = require("../controllers/User");
const router = express.Router();

router.patch("/", updateUserById);
router.get("/:id", getUserById);

module.exports = router;