const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (name, password, done) => {
        User.findOne(
          { $or: [{ name: name }, { email: name }] },
          (err, user) => {
            if (err) throw err;
            if (!user) {
              return done(null, false, { message: "Incorrect username" });
            }

            bcrypt.compare(password, user.password, (err, result) => {
              if (err) throw err;

              if (result) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            });
          }
        );
      }
    )
  );

  passport.serializeUser(function (user, done) {
    console.log("User id: ", user._id);
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      if (!err) {
        done(null, user);
      } else {
        done(err, null);
      }
    });
  });
};
