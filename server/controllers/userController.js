const express = require("express");
const app = express();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const User = require("../models/user");

exports.index = (req, res, next) => {};

exports.sign_up = async (req, res, next) => {
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }]
  }).catch((err) => {
    console.error(err);
  });

  if (user === null) {
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };

    data.password = await bcrypt.hash(req.body.password, 10);

    User.create(data).then((user) => {
      console.log(user);

      return res.status(200).json({ data: user });
    });
  } else {
    if (req.body.email === user.email) {
      res.status(200).json({ message: "Email already in use." });
      console.log("email in use");
    } else {
      res.status(200).json({ message: "Username already in use." });
      console.log("username in use");
    }
  }
};

exports.log_in = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;

    if (!user) {
      res.json({ message: "Incorrect username or password!" });
    } else {
      req.logIn(user, async (err) => {
        res.json({ id: req.user.id, user: req.user.username });
      });
    }
  })(req, res, next);
};

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) throw err;
  });
};
