var express = require("express");
var router = express.Router();

// process.env.NODE_ENV = 'production';
console.log(`Environment = ${process.env.NODE_ENV}`);

const knex1 = require("knex");
const knexfile = require("../knexfile");
const knex = knex1(knexfile.production);

// const knex = require("knex")({
//     client: 'pg',
//     connection: {
//       host: '192.168.5.145',
//       port: 5432,
//       user: 'pguser',
//       database: 'todo_app_db',
//       password: 'Y8y8y8y8!',
//       ssl: false,
//     },
//   });

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

// route to get all todos
router.get('/', (req, res) => {
  knex('todos').select()
    .orderBy('id', order = 'asc')
    .then((todos) => {
      let count = todos.length;
      res.status(200).json({ todos, count });
    })
    .catch((error) => {
      console.log(`error GET todos/: ${error}`);
      res.sendStatus(500);
    });
});

// route to get a single todo 
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(`GET todos with id ${id}`);
  knex('todos').select()
    .where('id', id)
    .first()
    .then((todo) => {
      console.log("response 200 yay");
      res.status(200).json({ todo });
    })
    .catch((error) => {
      console.log(`error GET todos/:id: ${error}`);
      res.sendStatus(500);
    });
});

// knex('todos').insert([
//     {written_by: 'simonque', title: "My first todo"},
//     {written_by: 'simonque', title: "My second todo"},
//     {written_by: 'simonque', title: "My third todo"},
// ])
// .then(() => {
//     console.log('inserted successfully');
// })
// .catch((error) => {
//     console.log(`failed to insert: ${error}`);
// });

// route to create a new todo
router.post('/', (req, res) => {
  knex('todos').insert({
    created_at_ts: Date.now(),
    written_by: req.body.written_by,
    title: req.body.title,
    body: req.body.body,
    completed: false,
  })
    .then(() => {
      console.log('inserted successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`failed to insert: ${error}`);
      res.sendStatus(500);
    });
});

// route to replace an existing todo
router.put('/:id', (req, res) => {
  let id = req.params.id;
  let todo = req.body;
  knex('todos').update(todo)
    .where('id', id)
    .then(() => {
      console.log('updated sucessfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`failed to update: ${error}`);
      res.sendStatus(500);
    });
});

// // route to update an existing todo 
// router.patch('/:id', (req, res) => {
//   let id = req.params.id;
//   let body =req
//   knex('todos').update({
//     written_by: "sjque"
//     updated_at_ts: Date.now(),

//   })
//   .where('id', id)
//   .then(() => {
//     console.log('updated sucessfully');
//     res.sendStatus(200);
//   })
//   .catch((error) => {
//     console.log(`failed to update: ${error}`);
//     res.sendStatus(500);
//   });
// });

// route to delete an existing todo
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  knex('todos').delete()
    .where('id', id)
    .then(() => {
      console.log('deleted successfully');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`failed to delete: ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;