const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/sign-up", userController.index);

router.post("/sign-up", userController.sign_up);

module.exports = router;
