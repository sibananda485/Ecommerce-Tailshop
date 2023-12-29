const express = require("express")
const {getAllCategory,createCategory} = require("../controllers/Category")
const router = express.Router()

router.get("/",getAllCategory)
router.post("/",createCategory)

module.exports = router