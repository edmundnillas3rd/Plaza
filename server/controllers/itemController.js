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

function createItemCards(items) {
  const bucket = getStorage(firebaseApp).bucket();

  const signedItems = items.map(async (item) => {
    const { name, price, rating, category } = item;

    const options = {
      version: "v2", // defaults to 'v2' if missing.
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 // one hour
    };

    const url = item.image.urls[0];
    const [signedUrl] = await bucket.file(url).getSignedUrl(options);

    const newItem = {
      name,
      price,
      rating,
      category,
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
      }
    },
    (err, results) => {
      if (err) return console.error(err);

      if (!results.items) {
        const err = new Error("Items not found");
        err.status = 404;
        return next(err);
      }

      const { items } = results;

      const signedItems = createItemCards(items);

      Promise.all(signedItems).then(function (items) {
        console.log("Signed Url", items);

        res.json({
          items
        });
      });

      // const bucket = getStorage(firebaseApp).bucket();
      // const signedUrls = results.items.map(async (item) => {
      //   const options = {
      //     version: "v2", // defaults to 'v2' if missing.
      //     action: "read",
      //     expires: Date.now() + 1000 * 60 * 60 // one hour
      //   };

      //   const url = item.image.urls[0];
      //   const [signedUrl] = await bucket.file(url).getSignedUrl(options);

      //   return signedUrl;
      // });

      // Promise.all(signedUrls).then(function (urls) {
      //   console.log("Signed Url", urls);

      //   console.log("Results", results);
      //   console.log("Items to be sent", results.items);
      //   console.log("Computers", results.computers);
      //   console.log("Men's Fashion", results.mens);

      //   res.json({
      //     error: err,
      //     general: results.items,
      //     computers: results.computers,
      //     mens: results.mens,
      //     urls
      //   });
      // });
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

  const { seller, name, price, description, stock, category, rating } =
    JSON.parse(req.body.itemData);

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
    rating,
    categoryName,
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
