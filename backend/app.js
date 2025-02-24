var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDB = require("./config/DBconnection"); // Import the DB connection

// var indexRouter = require("./routes/index");
var userRoutes = require("./routes/userRoutes");
var authRoutes = require("./routes/authRoutes");
<<<<<<< HEAD
var mealplanRoutes = require("./routes/mealplanRoutes");
=======
var feedbackRoutes = require("./routes/feedbackRoutes");
>>>>>>> cb77be8717650187f9f458366f370c5c0511043e

var app = express();

connectDB(); // Connect to MongoDB Atlas

// view engine setup
// app.set('views', path.join(__dirname, 'views')); -- "deleted"
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public'))); -- "deleted"

// app.use("/", indexRouter);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
<<<<<<< HEAD
app.use("./api/mealplan", mealplanRoutes);
=======
app.use("/api/feedback", feedbackRoutes);
>>>>>>> cb77be8717650187f9f458366f370c5c0511043e

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  m;
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {}, // Hide error details in production
  });
});

module.exports = app;
