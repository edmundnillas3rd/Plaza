const express = require("express");
const router = express.Router();

const user_controller = require("../controllers/userController");

// GET
router.get("/", user_controller.index);
router.get("/logout", user_controller.log_out);

// POST
router.post("/signup", user_controller.sign_up);
router.post("/login", user_controller.log_in);

module.exports = router;
