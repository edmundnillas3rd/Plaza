const dotenv = require("dotenv");
dotenv.config({path: "config.env"});

const { getStorage } = require("firebase-admin/storage");
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const initializeFirebase = require("../utils/firebaseConfig");
const firebaseApp = initializeFirebase();

const { Item } = require("../models/item");
const Review = require("../models/review");
const Category = require("../models/category");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET
exports.index = async (req, res, next) => {
  const items = await Item.find()
    .populate("seller", "name")
    .populate("category");
  const categories = await Category.find();

  if (!items || !categories) {
    return;
  }

  res.status(200).json({
    items,
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

  res.status(200).json({
    items
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

  res.status(200).json({
    items: searchedItems
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

  res.status(200).json({
    item,
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

  await bucket.makePublic();

  let urlImagePaths = files.map(async (file) => {
    let url = `${seller}/${name}/${file.originalname}`;

    const uploadedFile = bucket.file(url);
    const fileBuffer = Buffer.from(file.buffer, "utf-8");

    await uploadedFile.save(fileBuffer, {
      metadata: {
        contentType: "image/jpeg"
      }
    })

    url = uploadedFile.publicUrl();
    return url;
  });

  urlImagePaths = await Promise.all(urlImagePaths);

  // Multiplied by 100
  // since stripe only accepts amount in decimals
  const modifiedPrice = price * 100;

  const stripeProduct = await stripe.products.create({
    name: name,
    description: description,
    default_price_data: {
      currency: "usd",
      unit_amount_decimal: modifiedPrice
    },
    images: [...urlImagePaths]
  });

  const stripeProductPrice = await stripe.prices.create({
    currency: "usd",
    product: stripeProduct.id,
    unit_amount: modifiedPrice
  })

  const item = new Item({
    seller: seller,
    name: name,
    price: price,
    stripe_product_id: stripeProduct.id,
    stripe_price_id: stripeProductPrice.id,
    description: description,
    stock: stock,
    category: categoryName[0]._id,
    image: {
      urls: [...urlImagePaths]
    }
  });

  const newItem = await item.save();

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
