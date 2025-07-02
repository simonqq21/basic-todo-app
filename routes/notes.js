import express from "express";
import { Sequelize, Op } from "sequelize";
import { sequelize, Note } from "../models/index.js";
import { where } from "sequelize";
var router = express.Router();
// process.env.NODE_ENV = 'production';
console.log(`Environment = ${process.env.NODE_ENV}`);
// import knex1 from "knex";
// import knexfile from "../knexfile.js";
// const knex = knex1(knexfile.production);
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

// route to get todos paginated or search for todos paginated
router.get("/", async (req, res) => {
  const page = isNaN(parseInt(req.query.page)) ? 1 : parseInt(req.query.page);
  const limit = isNaN(parseInt(req.query.limit))
    ? 10
    : parseInt(req.query.limit);
  const search = req.query.search;
  let notes;
  // console.log(`search string = ${search}`);
  try {
    if (search) {
      notes = await Note.findAll({
        offset: limit * (page - 1),
        limit: limit,
        where: { [Op.iLike]: `%${searchLower}%` },
        order: [["id", "DESC"]],
      });
    } else {
      notes = await Note.findAll({
        offset: limit * (page - 1),
        limit: limit,
        order: [["id", "DESC"]],
      });
    }
    let count = notes.length;
    res.status(200).json({ notes, count });
  } catch (error) {
    console.log(`error GET todos/page: ${error}`);
    res.sendStatus(500);
  }

  // return notes;

  // knex("todos")
  //   .select()
  //   .orderBy("id", "desc")
  //   // search within titles if search string is provided in queries
  //   .modify((queryBuilder) => {
  //     if (search) {
  //       let searchLower = search.toLowerCase();
  //       console.log(`search = ${searchLower}`);
  //       queryBuilder.whereILike("title", `%${searchLower}%`);
  //     }
  //   })
  //   .limit(limit)
  //   .offset(limit * (page - 1))
  //   .then((todos) => {
  //     let count = todos.length;
  //     res.status(200).json({ todos, count });
  //   })
  //   .catch((error) => {
  //     console.log(`error GET todos/page: ${error}`);
  //     res.sendStatus(500);
  //   });
});

// route to get a single todo
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`GET todos with id ${id}`);
  const note = await Note.findOne({ where: { id } });
  res.status(200).json({ note });
  // knex("todos")
  //   .select()
  //   .where("id", id)
  //   .first()
  //   .then((todo) => {
  //     console.log("response 200 yay");
  //     res.status(200).json({ todo });
  //   })
  //   .catch((error) => {
  //     console.log(`error GET todos/:id: ${error}`);
  //     res.sendStatus(500);
  //   });
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
router.post("/", async (req, res) => {
  try {
    const note = await Note.create({
      written_by: req.body.written_by,
      title: req.body.title,
      body: req.body.body,
      completed: false,
    });
    console.log("inserted successfully");
    res.sendStatus(201);
  } catch (error) {
    console.log(`failed to insert: ${error}`);
    res.sendStatus(500);
  }

  // knex("todos")
  //   .insert({
  //     created_at_ts: Date.now(),
  //     written_by: req.body.written_by,
  //     title: req.body.title,
  //     body: req.body.body,
  //     completed: false,
  //   })
  //   .then(() => {
  //     console.log("inserted successfully");
  //     res.sendStatus(201);
  //   })
  //   .catch((error) => {
  //     console.log(`failed to insert: ${error}`);
  //     res.sendStatus(500);
  //   });
});

// route to edit an existing todo
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let noteData = req.body;
  try {
    let dbNote = await Note.findOne({ where: { id } });
    await dbNote.update(noteData);
    console.log("updated sucessfully");
    res.sendStatus(200);
  } catch (error) {
    console.log(`failed to update: ${error}`);
    res.sendStatus(500);
  }

  // knex("todos")
  //   .update(todo)
  //   .where("id", id)
  //   .then(() => {
  //     console.log("updated sucessfully");
  //     res.sendStatus(200);
  //   })
  //   .catch((error) => {
  //     console.log(`failed to update: ${error}`);
  //     res.sendStatus(500);
  //   });
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
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Note.destroy({ where: { id } });
    console.log("deleted successfully");
    res.sendStatus(200);
  } catch (error) {
    console.log(`failed to delete: ${error}`);
    res.sendStatus(500);
  }
  // knex("todos")
  //   .delete()
  //   .where("id", id)
  //   .then(() => {
  //     console.log("deleted successfully");
  //     res.sendStatus(200);
  //   })
  //   .catch((error) => {
  //     console.log(`failed to delete: ${error}`);
  //     res.sendStatus(500);
  //   });
});

// module.exports = router;
export default router;
