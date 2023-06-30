const passport = require("passport");
const authenticate = passport.authenticate("local", { session: false });
const authorization = passport.authenticate("jwt", { session: false });

module.exports = {
  authenticate,
  authorization
};
