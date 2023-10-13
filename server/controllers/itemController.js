const dotenv = require("dotenv");
dotenv.config({path: "config.env"});

const { getStorage } = require("firebase-admin/storage");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const initializeFirebase = require("../utils/firebaseConfig");
const firebaseApp = initializeFirebase();

const Item = require("../models/item");
const User = require("../models/user");
const Review = require("../models/review");
const Category = require("../models/category");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function signItems(items) {
  const signedItems = [];
  const bucket = getStorage(firebaseApp).bucket();

  const options = {
    version: "v2", // defaults to 'v2' if missing.
    action: "read",
    expires: Date.now() + 1000 * 60 * 60 // one hour
  };

  // TODO (Edmund): It would be better to put this in a seperate
  // function for handling sending data for previewing a product
  if (!Array.isArray(items)) {
    const { _id, name, seller, price, description, stock, category, url } =
      items;

    const signedUrls = [];
    for (const url of items.image.urls) {
      const [signedUrl] = await bucket.file(url).getSignedUrl(options);
      signedUrls.push(await signedUrl);
    }

    const review = await Review.aggregate([
      {
        $group: { _id: "$item", avgRating: { $avg: "$rating" } }
      },
      {
        $match: { _id: ObjectId(_id) }
      }
    ]);
    const rating =
      review[0]?.avgRating === undefined ? 0 : review[0].avgRating.toFixed(1);

    const newItem = {
      _id,
      name,
      seller,
      price,
      description,
      stock,
      category,
      url,
      signedUrls,
      rating
    };

    signedItems.push(await newItem);

    return signedItems;
  }

  // TODO (Edmund): the same could be said for this loop for signing
  // the url of each products
  for (const item of items) {
    const { _id, name, price, category, url } = item;

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
    const rating =
      review[0]?.avgRating === undefined ? 0 : review[0].avgRating.toFixed(1);

    const newItem = {
      _id,
      name,
      price,
      rating,
      category,
      url,
      signedUrl
    };

    signedItems.push(await newItem);
  }

  return signedItems;
}

// GET
exports.index = async (req, res, next) => {
  const items = await Item.find()
    .populate("seller", "name")
    .populate("category");
  const categories = await Category.find();

  if (!items || !categories) {
    return;
  }

  const signedItems = await signItems(items);

  res.status(200).json({
    items: signedItems,
    categories
  });
};

exports.item_categories = async (req, res) => {
  const categories = await Category.find();

  if (!!!categories) {
    res.status(404).end();
  }

  res.status(200).json({
    categories
  });
};

exports.item_filter_categories = async (req, res) => {
  const { category_id } = req.params;
  const items = await Item.find({
    category: category_id
  }).populate("category", "name");

  const signedItems = await signItems(items);

  res.status(200).json({
    items: signedItems
  });
};

exports.item_search = async (req, res) => {
  const { item_name } = req.params;

  const searchedItems = await Item.aggregate([
    {
      $search: {
        index: "searchItems",
        text: {
          query: `{ name: \"${item_name}\" }`,
          path: {
            wildcard: "*"
          }
        }
      }
    }
  ]);

  const signedItems = await signItems(searchedItems);

  res.status(200).json({
    items: signedItems
  });
};

exports.item_detail = async (req, res, next) => {
  const { id } = req.params;

  const item = await Item.findById(id)
    .populate("seller", "name")
    .populate("category");

  const reviews = await Review.find({ item: id })
    .populate("user", "name")
    .populate("item", "name");

  if (!item || !reviews) {
    return;
  }

  const [signedItem] = await signItems(item);

  res.status(200).json({
    item: signedItem,
    reviews
  });
};

// POST
exports.new_item = async (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.status(401).json({
      message: "Not Authenticated"
    });
    return;
  }

  const files = req.files;

  const { seller, name, price, description, stock, category } = JSON.parse(
    req.body.itemData
  );

  const categoryName = await Category.find({ name: category });

  const bucket = getStorage(firebaseApp).bucket();

  const urlImagePaths = files.map((file) => {
    const url = `${seller}/${name}/${file.originalname}`;

    const uploadedFile = bucket.file(url);
    const fileBuffer = Buffer.from(file.buffer, "utf-8");

    uploadedFile.save(fileBuffer, {
      metadata: {
        contentType: "image/jpeg"
      }
    })

    return url;
  });

  const item = new Item({
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

  const newItem = await item.save();

  const stripeProduct = await stripe.products.create({
    id: newItem._id,
    name: newItem.name,
    description: newItem.description,
    default_price_data: {
      currency: "usd",
      unit_amount_decimal: newItem.price
    }
  });

  if (newItem === item) {
    res.status(200).json({ message: "New Item added!" });
  }
};

exports.item_review = async (req, res, next) => {
  if (req.isUnauthenticated()) {
    res.status(401).json({
      message: "Not Authenticated"
    });
    return;
  }

  const { id } = req.params;
  const { reviewer, description, rating } = req.body;

  const review = new Review({
    reviewer,
    item: id,
    description,
    rating
  });

  await review.save();

  res.status(200).json({ message: "New Review added!" });

  const foundItem = await Item.findByIdAndUpdate(id, {
    $push: { reviews: review }
  });
};
