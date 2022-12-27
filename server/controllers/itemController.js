const Item = require("../models/item");

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      items(callback) {
        Item.find({}, callback);
      }
    },
    (err, results) => {
      res.json({
        error: err,
        receiveData: results
      });
    }
  );
};
