const Item = require("../models/item");
const Owner = require("../models/owner");

const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find().populate("owner").exec(callback);
      }
    },
    (err, results) => {
      if (err) return next(err);

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
        Item.findById(req.params.id).populate("owner").exec(callback);
      }
    },
    (err, item) => {
      if (err) return next(err);

      if (!item) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }

      res.json({
        error: err,
        result: item
      });
    }
  );
};
