const express = require("express");
const { getCartByUserId, addToCart ,delteCartItemById,updateCartItemById} = require("../controllers/Cart");
const router = express.Router();
// router.get("/", getchAllProduct);
router.post("/",addToCart);
router.get("/", getCartByUserId);
router.delete("/:id", delteCartItemById);
router.patch("/:id",updateCartItemById);
// router.patch("/:id", updateProductById);

module.exports = router;
