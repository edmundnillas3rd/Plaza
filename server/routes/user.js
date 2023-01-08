const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.index);
router.post("/sign-up", userController.sign_up);
router.post("/login", userController.log_in);
router.get("/logout", userController.log_out);

module.exports = router;
