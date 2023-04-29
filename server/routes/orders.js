const passport = require("passport");
const express = require("express");
const router = express.Router();

const order_controller = require("../controllers/orderController");
const authenticate = passport.authenticate("jwt", { session: false });

// GET
router.get("/", order_controller.index);

// POST
router.post("/cart", authenticate ,order_controller.cart);

module.exports = router;
