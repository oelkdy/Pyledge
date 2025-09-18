var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// database connection
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { Console } = require('console');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'omar567890',
  database: "addressbook",
});

const addressbookRoutes = require('./routes/addressbook')(db);
app.use('/', addressbookRoutes);
const addRoutes = require('./routes/add')(db);
app.use('/', addRoutes);

db.connect((err) => {
  if(err) {
    console.error('Database connection fail:', err);
  } else {
    console.log('Database connection succesful');
  }
})
module.exports = app;

app.get('/vid', (req, res) => {
  res.render('vid');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






