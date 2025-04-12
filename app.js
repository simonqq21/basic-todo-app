var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const knex = require("knex")({
  client: 'pg',
  connection: {
    host: '192.168.5.145',
    port: 5432,
    user: 'pguser',
    database: 'todo_app_db',
    password: 'Y8y8y8y8!',
    ssl: false,
  },
});

knex.schema.createTable('users2', function (table) {
  table.increments();
  table.string('name');
  table.timestamps();
}).then(() => {
  console.log("iuop");
}).catch((error) => {
  console.log(`${error}`);
});


// await knex.schema.createTable('users', function (table) {
//   table.increments();
//   table.string('name');
//   table.timestamps();
// }).then().catch(() => {
//   console.log('qwerty');
// });

// try {
//   pg.schema.createTable('users', function (table) {
//     table.increments();
//     table.string('name');
//     table.timestamps();
    
//   }).then(() => {
//     console.log('table created.');
//   });
// } catch (error) {
//   console.log("db authentication error.");
// }


// console.log("oiaioiiiai");
// let users = pg.select().table('users');
// console.log(`users=${users}`);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos'); 

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
app.use('/todos', todosRouter);

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
