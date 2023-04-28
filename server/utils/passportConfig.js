const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const jwtCookieComboStrategy = require("passport-jwt-cookiecombo");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

function passportConfig(passport) {
  passport.use(
    new jwtCookieComboStrategy(
      {
        secretOrPublicKey: process.env.JWTSECRET,
        passReqToCallback: false
      },
      (payload, done) => {
        return done(null, payload.user, {});
      }
    )
  );

  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password", session: false },
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
}

const authenticate = (req, res, next) => {
  const authToken = req.header("authorization");
  const token = authToken.split(" ")[1];

  const reqHeader = {
    headers: {
      authorization: token
    },
    get: function (key) {
      return this.headers[key];
    }
  };

  passport.authenticate(
    "jwt-cookiecombo",
    { session: false },
    (err, user, info) => {
      if (err) return console.warn(err);

      user.from = "header";
      jwt.verify(token, process.env.JWTSECRET, (error, decode) => {
        if (error) {
          console.error(error);
          next();
        } else {
          next();
        }
      });
    }
  )(reqHeader, res, next);
};

module.exports = {
  passportConfig,
  authenticate
};
