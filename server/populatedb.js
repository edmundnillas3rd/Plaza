#!/usr/bin/env node

console.log(`Populate the database with username and items`);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");

const Item = require("./models/item");
const User = require("./models/user");
const Review = require("./models/review");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const mongoose = require("mongoose");
const review = require("./models/review");
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const users = [];
const items = [];
const reviews = [];

function userCreate(name, cb) {
  const user = new User({ name: name });

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New User: ${user}`);
    users.push(user);
    cb(null, user);
  });
}

function itemCreate(name, user, price, description, stock, cb) {
  const item = new Item({
    name: name,
    user: user,
    price: price,
    description: description,
    stock: stock
  });

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Item: ${item}`);
    items.push(item);
    cb(null, item);
  });
}

function reviewCreate(user, item, description, rating, cb) {
  const review = new Review({
    user: user,
    item: item,
    description: description,
    rating: rating
  });

  review.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Review: ${review}`);
    reviews.push(review);
    cb(null, review);
  });
}

function createUser(cb) {
  async.series(
    [
      function (callback) {
        userCreate("Rothfuss", callback);
      },
      function (callback) {
        userCreate("Bova", callback);
      },
      function (callback) {
        userCreate("Asimov", callback);
      },
      function (callback) {
        userCreate("Billings", callback);
      },
      function (callback) {
        userCreate("Jones", callback);
      }
    ],
    cb
  );
}

function createItem(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "GameBoyAdvance SP",
          users[0],
          1000.0,
          "A standard gameboy advance SP for your GBA titles",
          5,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mechanical Pen",
          users[1],
          50.0,
          "perfect for precise penmarkship for writing",
          30,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Arduino",
          users[2],
          5000.0,
          "a standard pack for getting started in electronics",
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "GTX 1080",
          users[3],
          11000.0,
          "mid-end graphics card for gaming",
          3,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kingston Flash Drive",
          users[4],
          500.0,
          "for storing digital medias and files",
          100,
          callback
        );
      }
    ],
    cb
  );
}

function createReview(cb) {
  async.parallel(
    [
      function (callback) {
        reviewCreate(users[0], items[0], "Dunno what to say", 2, callback);
      },
      function (callback) {
        reviewCreate(users[3], items[1], "Hey this is goood", 5, callback);
      },
      function (callback) {
        reviewCreate(users[4], items[0], "Might do better", 3, callback);
      },
      function (callback) {
        reviewCreate(
          users[0],
          items[0],
          "Good product, received full intact",
          5,
          callback
        );
      }
    ],
    cb
  );
}

async.series(
  [createUser, createItem, createReview],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Item instances: " + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
