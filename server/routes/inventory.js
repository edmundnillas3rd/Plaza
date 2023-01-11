var express = require("express");
var router = express.Router();

const item_catalog = require("../controllers/itemController");

router.get("/", item_catalog.index);
router.post("/items", item_catalog.new_item);
router.get("/items/:id", item_catalog.item_detail);
router.post("/items/:id/reviews", item_catalog.item_review);

module.exports = router;
