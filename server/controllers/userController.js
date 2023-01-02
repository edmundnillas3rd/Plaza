const User = require("../models/user");

exports.index = (req, res, next) => {
  res.send("This is the user path");
};

exports.sign_up = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).save((err) => {
    if (err) {
      console.error(`ERROR IN POST: ${err}`);
      return next(err);
    }
  });
};
