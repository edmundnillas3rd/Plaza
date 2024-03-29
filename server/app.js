const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const inventoryRouter = require("./routes/inventory");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/orders");
const webhookRouter = require("./routes/webhooks");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const connectDB = require("./utils/connectDB");
connectDB();

// Webhooks
app.use("/webhook", express.raw({ type: "application/json" }));
app.use("/webhook", webhookRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production"
    },
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URL
    })
  })
);

app.use(passport.authenticate("session"));
require("./utils/passportConfig")(passport);

app.use("/", userRouter);
app.use("/inventory", inventoryRouter);
app.use("/orders", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
