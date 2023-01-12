const Item = require("../models/item");
const User = require("../models/user");
const Review = require("../models/review");

const async = require("async");

exports.index = (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find({}, "name description")
          .populate("user", "username")
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) return console.error(err);

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

exports.new_item = async (req, res, next) => {
  const { id, name, price, description, stock } = req.body;

  const item = await new Item({
    user: id,
    name,
    price,
    description,
    stock
  });

  item.save(function (err) {
    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json({ message: "New Item added!" });

    console.log(`New Item ${item}`);
  });
};

exports.item_detail = (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id)
          .populate("user", "username")
          .exec(callback);
      },
      reviews(callback) {
        Review.find({ item: req.params.id })
          .populate("user", "username")
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

exports.item_review = async (req, res, next) => {
  const { user, item, description, rating } = req.body;

  const review = await new Review({
    user,
    item,
    description,
    rating
  });

  review.save(function (err) {
    if (err) {
      console.error(err);
      return;
    }

    res.status(200).json({ message: "New Review added!" });

    console.log(`New Item ${item}`);
  });

  const foundItem = await Item.findByIdAndUpdate(item, {
    $push: { reviews: review }
  });
};
