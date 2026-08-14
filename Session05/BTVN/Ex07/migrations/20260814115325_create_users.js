exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 255).unique().notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
