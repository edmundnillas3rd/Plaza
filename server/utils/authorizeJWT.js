const passport = require("passport");
const authorization = passport.authenticate("jwt", { session: false });

module.exports = {
  authorization
};
