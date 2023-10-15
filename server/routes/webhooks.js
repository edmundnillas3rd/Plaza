const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");

router.post("/", order_controller.checkout_webhook);

module.exports = router;