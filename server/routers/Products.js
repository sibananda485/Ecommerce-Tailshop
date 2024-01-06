const express = require("express");
const { createProduct,getchAllProduct,getProductById, updateProductById } = require("../controllers/Product");
const router = express.Router();

router.get("/", getchAllProduct);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.patch("/:id", updateProductById);

module.exports = router;
