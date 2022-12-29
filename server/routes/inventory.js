var express = require("express");
var router = express.Router();

const item_catalog = require("../controllers/itemController");

router.get("/", item_catalog.index);

router.get("/items/:id", item_catalog.item_detail);

module.exports = router;
