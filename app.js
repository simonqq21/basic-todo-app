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

/**
 * todo list schema:
 * id - int
 *  created_at_ts    -   datetime
 *  updated_at_ts   -   datetime
 *  written_by  -   string
 *  title   -   string
 *  body    -   string
 *  completed   -    bool
 *  image   -   blob
 */
knex.schema.createTable('todos', function (table) {
  table.increments("id");
  table.bigInteger("created_at_ts").notNullable().defaultTo(Date.now());
  table.bigInteger("updated_at_ts").notNullable().defaultTo(Date.now());
  table.string("written_by", 50).notNullable();
  table.string("title", 100).notNullable();
  table.string("body", 2000);
  table.boolean("completed").notNullable().defaultTo(false);
})
.then(() => {
  console.log("create todos schema success");
})
.catch((error) => {
  console.log(`${JSON.stringify(error)}, ${error}`);
});

// drop_tables = true
// drop_tables = false
// if (drop_tables) {
//   knex.schema.dropTable('todos')
//   .then(() => {
//     console.log("drop success");
//   })
//   .catch((error) => {
//     console.log(`${error}`);
//   });
// }

// knex('todos').insert([
//   {written_by: 'simonque', title: "My first todo"},
//   {written_by: 'simonque', title: "My second todo"},
//   {written_by: 'simonque', title: "My third todo"},
// ])
// .then(() => {
//   console.log('inserted successfully');
// })
// .catch((error) => {
//   console.log(`failed to insert: ${error}`);
// });

// knex('todos').select()
// .then((todos) => {
//   console.log('todos = \n');
//   for (const todo of todos) {
//     console.log(`${JSON.stringify(todo)}`);
//   }
//   // console.log(`todos = ${JSON.stringify(todos)}`);
// });

// knex('todos').update({written_by: "johannque"})
// .where('id', '=', '2')
// .then(() => {
//   console.log('updated sucessfully');
// })
// .catch((error) => {
//   console.log(`failed to update: ${error}`);
// });

// knex('todos').update({written_by: "sjque"})
// .where('id', '=', '2')
// .where('written_by', '=', 'johannque')
// .then(() => {
//   console.log('updated sucessfully');
// })
// .catch((error) => {
//   console.log(`failed to update: ${error}`);
// });
// console.log();

// knex('todos').select()
// .where('id', '>', 2)
// .then((todos) => {
//   console.log('todos = \n');
//   for (const todo of todos) {
//     console.log(`${JSON.stringify(todo)}`);
//   }
//   // console.log(`todos = ${JSON.stringify(todos)}`);
// });

// knex('todos').delete()
// .where('id', '>', 3)
// .then(() => {
//   console.log('deleted successfully');
//   knex('todos').select()
//   .then((todos) => {
//     console.log('todos = \n');
//     for (const todo of todos) {
//       console.log(`${JSON.stringify(todo)}`);
//     }
//   });
// })
// .catch((error) => {
//   console.log(`failed to delete: ${error}`);
// });

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
