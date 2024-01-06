const express = require("express")
const {getAllBrand,createBrand} = require("../controllers/Brand")

const router = express.Router()

router.get("/",getAllBrand)
router.post("/",createBrand)

module.exports = router