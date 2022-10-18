var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var debug = require('debug')('smartcityapp:server');

var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var moviesRouter = require("./routes/movies");
var bookmarksRouter = require("./routes/bookmarks");
var usersRouter = require("./routes/users"); // no lo usamos en este ejemplo

var app = express();

// MongoDB Atlas DB cluster connection
mongoose
  .connect(
    "mongodb+srv://ivangzdiaz:6lpNYrKijUa02ZHk@cluster0.6tkmcfn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => debug("MongoDB Atlas DataBase connection successful"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movies", moviesRouter);
app.use("/users", usersRouter); //No lo usamos en este ejemplo
app.use("/bookmarks", bookmarksRouter); //No lo usamos en este ejemplo

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
