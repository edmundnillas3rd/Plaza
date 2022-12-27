var express = require("express");
var router = express.Router();

const item_catalog = require("../controllers/itemController");

router.get("/", item_catalog.index);

module.exports = router;
