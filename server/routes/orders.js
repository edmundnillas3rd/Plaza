const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");

router.get("/", order_controller.index);
router.post("/cart", order_controller.cart);

module.exports = router;
