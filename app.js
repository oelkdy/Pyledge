var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'omar567890',
  database: "pyledge",
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connection successful');
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'fwdd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(function(req, res, next) {
  req.db = db;
  next();
});

// Route registration
app.use('/', indexRouter);
app.use('/users', usersRouter);

const registerRoutes = require('./routes/register')(db);
app.use('/', registerRoutes);

const checkEmailRoute = require('./routes/email')(db);
app.use('/', checkEmailRoute);

const dashboardRoute = require('./routes/dashboard')(db);
app.use('/', dashboardRoute);

const booksRoute = require('./routes/books')(db);
app.use('/', booksRoute);
console.log('Books route included');

const profileRoute = require('./routes/profile')(db);
app.use('/', profileRoute);

const exerciseRoute = require('./routes/exercise');
app.use('/', exerciseRoute);

const logoutRoute = require('./routes/logout')(db);
app.use('/', logoutRoute);

// Login Route
app.get('/login', (req, res) => {
  res.render('loginViews'); // Ensure this matches your Pug template name
});

app.post('/login', (req, res) => {
  // Debugging: Log the received email and password
  console.log('Email:', req.body.email);
  console.log('Password:', req.body.password);

  let sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.send('An error occurred');
      return;
    }
    // Debugging: Log the result of the query
    console.log('Query Result:', result);

    if (result.length > 0) {
      req.session.user = result[0];
      req.session.email = result[0].email;
      req.session.username = result[0].username;
      req.session.type = result[0].type;
      res.redirect('/dashboard');
    } else {
      res.send('Login failed');
    }
  });
});

app.get('/registerViews', (req, res) => {
  res.render('registerViews');
});

app.get('/loginViews', (req, res) => {
  res.render('loginViews');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/loginViews');
  }
  res.render('dashboard', { username: req.session.user.username });
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

module.exports = app;
