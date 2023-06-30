const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const { authenticate, authorization } = require("../utils/authorizeJWT");

// GET
router.get("/", user_controller.index);
router.get("/logout", authorization, user_controller.log_out);

// POST
router.post("/signup", user_controller.sign_up);
router.post("/login", authenticate, user_controller.log_in);

module.exports = router;
