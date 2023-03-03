const express = require("express");
const app = express();
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.index = (req, res, next) => {};

exports.sign_up = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({
    $or: [{ name: name }, { email: email }]
  }).catch((err) => {
    console.error(err);
  });

  if (user === null) {
    const newUser = {
      name,
      email,
      password
    };

    newUser.password = await bcrypt.hash(password, 10);

    User.create(newUser).then((user) => {
      console.log(user);

      return res.status(200).json({ data: user });
    });
  } else {
    if (email === user.email) {
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
      console.log("User not found!");
      res.json({ message: "Incorrect username or password!" });
    } else {
      req.logIn(user, (err) => {
        console.log(req.user);
        res.json({ id: req.user.id, user: req.user.name });
      });
    }
  })(req, res, next);
};

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) throw err;
  });
};
