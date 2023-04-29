const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");

const User = require("../models/user");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

module.exports = function (passport) {
  let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRET
  };

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
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
};
