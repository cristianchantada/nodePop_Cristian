var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var path = require('path');

var indexRouter = require('./routes/index');
const apiRouter = require("./routes/api/anuncios");
require("./lib/connectMongoose")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = "Nodepop"

/**
 * Rutas del sitio web.
 */

app.use('/', indexRouter);

/**
 * Rutas de la API.
 */

app.use("/api/anuncios", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // comprobación de errores de validación.
  
  if (err.array) {
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
