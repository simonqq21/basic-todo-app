/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('todos', function (table) {
        table.increments("id");
        table.bigInteger("created_at_ts").notNullable().defaultTo(knex.fn.now());
        table.bigInteger("updated_at_ts").notNullable().defaultTo(knex.fn.now());
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
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
