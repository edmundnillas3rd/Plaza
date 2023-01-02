const Item = require("../models/item");
const User = require("../models/user");
const Review = require("../models/review");

const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find().populate("user", "name").exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (!results.items) {
        const err = new Error("Items not found");
        err.status = 404;
        return next(err);
      }

      res.json({
        error: err,
        result: results
      });
    }
  );
};

exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id).populate("user").exec(callback);
      },
      reviews(callback) {
        Review.find({ item: req.params.id }, "reviews description rating")
          .populate("user", "name")
          .populate("item", "name")
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

      if (!results.item) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      if (!results.reviews) {
        const err = new Error("Reviews not found");
        err.status = 404;
        return next(err);
      }

      res.json({
        error: err,
        result: results
      });
    }
  );
};
