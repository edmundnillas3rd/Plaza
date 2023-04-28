const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

const { authenticate } = require("../utils/passportConfig");

// GET
router.get("/", user_controller.index);
router.get("/logout", authenticate, user_controller.log_out);

// POST
router.post("/signup", user_controller.sign_up);
router.post("/login", user_controller.log_in);

module.exports = router;
