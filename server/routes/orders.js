const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");
const { authorization } = require("../utils/authorizeJWT");

// GET
router.get("/", order_controller.index);

// POST
router.post("/checkout-session", authorization, order_controller.checkout_items);

module.exports = router;
