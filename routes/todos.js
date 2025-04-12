var express = require("express"); 
var router = express.Router();

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
    table.string("image_filename", 100);
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

// route to get all todos
router.get('/', (req, res) => {

    res.json({text: "hello world from todo app autoreloaded!!!"});
});

// route to get a single todo 
router.get('/:id', (req, res) => {

});

// route to create a new todo
router.post('/', (req, res) => {

});

// route to replace an existing todo
router.put('/:id', (req, res) => {

});

// route to update an existing todo 
route.patch('/:id', (req, res) => {

});

// route to delete an existing todo
router.delete('/:id', (req, res) => {

});

module.exports = router;