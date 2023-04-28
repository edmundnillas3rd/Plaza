var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });

const item_catalog = require("../controllers/itemController");

// GET
router.get("/", item_catalog.index);
router.get("/items", item_catalog.item_categories);
router.get("/items/search/:item_name", item_catalog.item_search);
router.get("/items/:id", item_catalog.item_detail);

// POST
router.post("/items", upload.array("images"), item_catalog.new_item);
router.post("/items/:id/reviews", item_catalog.item_review);

module.exports = router;
