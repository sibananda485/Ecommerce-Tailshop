const express = require("express");
const { createOrder,getOrderByUserId,updateOrderItemById,getAllOrder } = require("../controllers/Order");
const router = express.Router();

router.get("/", getOrderByUserId);
router.post("/", createOrder);
router.get("/admin", getAllOrder);
router.patch("/:id", updateOrderItemById);

module.exports = router; 