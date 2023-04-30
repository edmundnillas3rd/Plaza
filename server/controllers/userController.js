const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

exports.index = (req, res, next) => {};

exports.log_out = (req, res, next) => {
  req.logout(function (err) {
    if (err) throw err;

    res.status(200).json({
      message: "User successfully log out"
    });
  });
};

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
        if (err) console.error(err);

        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        res.header(token);

        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            token
          }
        });
      });
    }
  })(req, res, next);
};
