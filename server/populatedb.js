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
const Owner = require("./models/owner");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const items = [];
const owners = [];

function ownerCreate(name, cb) {
  const owner = new Owner({ name: name });

  owner.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    console.log(`New Owner: ${owner}`);
    owners.push(owner);
    cb(null, owner);
  });
}

function itemCreate(name, owner, price, description, stock, cb) {
  const item = new Item({
    name: name,
    owner: owner,
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

function createOwner(cb) {
  async.series(
    [
      function (callback) {
        ownerCreate("Rothfuss", callback);
      },
      function (callback) {
        ownerCreate("Bova", callback);
      },
      function (callback) {
        ownerCreate("Asimov", callback);
      },
      function (callback) {
        ownerCreate("Billings", callback);
      },
      function (callback) {
        ownerCreate("Jones", callback);
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
          owners[0],
          1000.0,
          "A standard gameboy advance SP for your GBA titles",
          5,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Mechanical Pen",
          owners[1],
          50.0,
          "perfect for precise penmarkship for writing",
          30,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Arduino",
          owners[2],
          5000.0,
          "a standard pack for getting started in electronics",
          15,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "GTX 1080",
          owners[3],
          11000.0,
          "mid-end graphics card for gaming",
          3,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Kingston Flash Drive",
          owners[4],
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

async.series(
  [createOwner, createItem],
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
