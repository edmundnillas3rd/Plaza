var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/items", function (req, res, next) {
  // res.status(200).json({ message: "Hello" });
  res.status(200).json({
    items: [
      {
        title: "Item 1",
        description: "A ballpen",
        id: 1
      },
      {
        title: "Item 2",
        description: "An erasure",
        id: 23
      },
      {
        title: "Item 3",
        description: "A bond paper",
        id: 55
      },
      {
        title: "Gameboy Advance",
        description: "A GBA SP for collectors",
        id: 1132
      }
    ]
  });
});

module.exports = router;
