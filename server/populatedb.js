#!/usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/?retryWrites=true&w=majority"
);

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

const mongoose = require("mongoose");
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];

function itemCreate(name, owner, price, description, cb) {
  const item = new Item({
    name: name,
    owner: owner,
    price: price,
    description: description
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

function createItem(cb) {
  async.series(
    [
      function (callback) {
        itemCreate(
          "GameBoyAdvance SP",
          "Rothfuss",
          1000.0,
          "A standard gameboy advance SP for your GBA titles",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mechanical Pen",
          "Bova",
          50.0,
          "perfect for precise penmarkship for writing",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Arduino",
          "Asimov",
          5000.0,
          "a standard pack for getting started in electronics",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "GTX 1080",
          "Billings",
          11000.0,
          "mid-end graphics card for gaming",
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kingston Flash Drive",
          "Jones",
          500.0,
          "for storing digital medias and files",
          callback
        );
      }
    ],
    // optional callback
    cb
  );
}

async.series(
  [createItem],
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
