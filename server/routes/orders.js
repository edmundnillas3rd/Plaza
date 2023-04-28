const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");

// GET
router.get("/", order_controller.index);

// POST
router.post("/cart", order_controller.cart);

module.exports = router;
