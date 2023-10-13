var express = require("express");
var router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const item_catalog = require("../controllers/itemController");

const { authorization } = require("../utils/authorizeJWT");

// GET
router.get("/", item_catalog.index);
router.get("/items/categories", item_catalog.item_categories);
router.get("/items/categories/:category_id", item_catalog.item_filter_categories);
router.get("/items/search/:item_name", item_catalog.item_search);
router.get("/items/:id", item_catalog.item_detail);

// POST
router.post("/items", authorization, upload.array("images"), item_catalog.new_item);
router.post("/items/:id/reviews", authorization, item_catalog.item_review);

module.exports = router;
