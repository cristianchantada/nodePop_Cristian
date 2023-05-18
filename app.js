const LoginController = require('./controllers/LoginController');
const jwtAuthMiddleware = require('./lib/jwtAuthMiddleware');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var path = require('path');
const i18n = require('./lib/i18nConfig');


var indexRouter = require('./routes/index');
const apiRouter = require("./routes/api/anuncios");
require("./lib/connectMongoose");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(i18n.init);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = "Nodepop";
const loginController = new LoginController();

/**
 * Rutas del sitio web.
 */

app.get('/login', loginController.index);
app.post('/login', loginController.Authenticate);
app.use('/change-locale', require('./routes/change-locale'))
app.use('/', indexRouter);

/**
 * Rutas de la API.
*/

app.post("/api/authenticate", loginController.Authenticate);
app.use("/api/anuncios", jwtAuthMiddleware, apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  res.status(err.status || 500);

  // Retorno de JSON en caso de que el error provenga de la API.

  if (req.originalUrl.startsWith('/api/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
