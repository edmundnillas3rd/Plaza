const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },
      (username, password, done) => {
        User.findOne(
          { $or: [{ username: username }, { email: username }] },
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
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById({ _id: id }, function (err, user) {
      done(err, user);
    });
  });
};
