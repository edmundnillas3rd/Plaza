var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/" });
const passport = require("passport");

const item_catalog = require("../controllers/itemController");

const authenticate = passport.authenticate("jwt", { session: false });

// GET
router.get("/", item_catalog.index);
router.get("/items", item_catalog.item_categories);
router.get("/items/search/:item_name", item_catalog.item_search);
router.get("/items/:id", item_catalog.item_detail);

// POST
router.post("/items", authenticate, upload.array("images"), item_catalog.new_item);
router.post("/items/:id/reviews", authenticate, item_catalog.item_review);

module.exports = router;
