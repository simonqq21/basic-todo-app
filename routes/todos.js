var express = require("express"); 
var router = express.Router();

process.env.NODE_ENV = 'production';
console.log(`${process.env.NODE_ENV}`);

const knex = require("knex");
const knexfile = require("../knexfile"); 
const db = knex(knexfile.production);

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
    .then((todos) => {
      console.log('todos = \n');
      for (const todo of todos) {
        console.log(`${JSON.stringify(todo)}`);
      }
      // console.log(`todos = ${JSON.stringify(todos)}`);
    });
    res.json({text: "hello world from todo app autoreloaded!!!"});
});

// route to get a single todo 
router.get('/:id', (req, res) => {
    knex('todos').select()
    .where('id', '>', 2)
    .then((todos) => {
    console.log('todos = \n');
    for (const todo of todos) {
        console.log(`${JSON.stringify(todo)}`);
    }
    // console.log(`todos = ${JSON.stringify(todos)}`);
    });
});

db('todos').insert([
    {written_by: 'simonque', title: "My first todo"},
    {written_by: 'simonque', title: "My second todo"},
    {written_by: 'simonque', title: "My third todo"},
])
.then(() => {
    console.log('inserted successfully');
})
.catch((error) => {
    console.log(`failed to insert: ${error}`);
});

// route to create a new todo
router.post('/', (req, res) => {
    knex('todos').insert([
        {written_by: 'simonque', title: "My first todo"},
        {written_by: 'simonque', title: "My second todo"},
        {written_by: 'simonque', title: "My third todo"},
    ])
    .then(() => {
        console.log('inserted successfully');
    })
    .catch((error) => {
        console.log(`failed to insert: ${error}`);
    });
});

// route to replace an existing todo
router.put('/:id', (req, res) => {
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
});

// route to update an existing todo 
router.patch('/:id', (req, res) => {

});

// route to delete an existing todo
router.delete('/:id', (req, res) => {
    knex('todos').delete()
    .where('id', '>', 3)
    .then(() => {
        console.log('deleted successfully');
        knex('todos').select()
        .then((todos) => {
        console.log('todos = \n');
        for (const todo of todos) {
            console.log(`${JSON.stringify(todo)}`);
        }
        });
    })
    .catch((error) => {
        console.log(`failed to delete: ${error}`);
    });
});

module.exports = router;