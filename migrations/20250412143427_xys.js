/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    console.log(99);
    return knex.schema.alterTable('todos', function (table) {
        table.bigInteger("created_at_ts").alter();
        table.bigInteger("created_at_ts").alter({alterNullable: false});
        table.bigInteger("created_at_ts").defaultTo(knex.raw('extract(epoch from now()) * 1000')).alter();
        table.bigInteger("updated_at_ts").alter();
        table.bigInteger("updated_at_ts").alter({alterNullable: false});
        table.bigInteger("updated_at_ts").defaultTo(knex.raw('extract(epoch from now()) * 1000')).alter();
      });
    //   .then(() => {
    //     console.log("alter todos schema success");
    // })
    // .catch((error) => {
    //     console.log(`${JSON.stringify(error)}, ${error}`);
    // });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
