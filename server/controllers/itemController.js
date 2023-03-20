const async = require("async");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "");
  }
});
const upload = multer({ storage: storage });

const { getStorage } = require("firebase-admin/storage");

const initializeFirebase = require("../utils/firebaseConfig");
const firebaseApp = initializeFirebase();

const Item = require("../models/item");
const User = require("../models/user");
const Review = require("../models/review");
const Category = require("../models/category");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

function createItemCards(items) {
  const bucket = getStorage(firebaseApp).bucket();

  const signedItems = items.map(async (item) => {
    const { _id, name, price, category, url } = item;

    const options = {
      version: "v2", // defaults to 'v2' if missing.
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 // one hour
    };

    const imageUrl = item.image.urls[0];
    const [signedUrl] = await bucket.file(imageUrl).getSignedUrl(options);
    const review = await Review.aggregate([
      {
        $group: { _id: "$item", avgRating: { $avg: "$rating" } }
      },
      {
        $match: { _id: ObjectId(_id) }
      }
    ]);

    const rating = review[0]?.avgRating === undefined ? 0 : review[0].avgRating;

    const newItem = {
      name,
      price,
      rating,
      category,
      url,
      signedUrl
    };

    return newItem;
  });

  return signedItems;
}

exports.index = async (req, res, next) => {
  async.parallel(
    {
      items(callback) {
        Item.find()
          .populate("seller", "name")
          .populate("category")
          .exec(callback);
      },
      categories(callback) {
        Category.find().exec(callback);
      }
    },
    (err, results) => {
      if (err) return console.error(err);

      if (!results.items) {
        const err = new Error("Items not found");
        err.status = 404;
        return next(err);
      }

      const { items, categories } = results;

      const signedItems = createItemCards(items);

      Promise.all(signedItems).then(function (items) {
        console.log("Signed Url", items);

        res.json({
          items,
          categories
        });
      });
    }
  );
};

exports.item_categories = async (req, res) => {
  const categories = await Category.find();

  if (categories === null) {
    console.log("Categories not found");
    return;
  }

  res.json({
    categories
  });
};

exports.new_item = async (req, res, next) => {
  const files = req.files;

  console.log(files);

  const { seller, name, price, description, stock, category } = JSON.parse(
    req.body.itemData
  );

  const categoryName = await Category.find({ name: category });

  const bucket = getStorage(firebaseApp).bucket();

  const urlImagePaths = files.map((file) => {
    const filePath = file.path;

    const url = `${seller}/${name}/${file.originalname}`;

    bucket.upload(filePath, {
      destination: url,
      gzip: true
    });

    return url;
  });

  const item = await new Item({
    seller,
    name,
    price,
    description,
    stock,
    category: categoryName[0]._id,
    image: {
      urls: urlImagePaths
    }
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

exports.item_detail = async (req, res, next) => {
  async.parallel(
    {
      item(callback) {
        Item.findById(req.params.id).populate("seller", "name").exec(callback);
      },
      reviews(callback) {
        Review.find({ item: req.params.id })
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

      console.log(results.item);

      const bucket = getStorage(firebaseApp).bucket();

      const signedUrls = results.item.image.urls.map(async (url) => {
        const options = {
          version: "v2", // defaults to 'v2' if missing.
          action: "read",
          expires: Date.now() + 1000 * 60 * 60 // one hour
        };

        const [signedUrl] = await bucket.file(url).getSignedUrl(options);

        return signedUrl;
      });

      Promise.all(signedUrls).then(function (urls) {
        console.log("Signed Url", urls);

        res.json({
          error: err,
          item: results.item,
          reviews: results.reviews,
          urls
        });
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
