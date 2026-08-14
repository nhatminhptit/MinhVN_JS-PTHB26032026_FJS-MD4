exports.up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.integer("total").notNullable();
    table.timestamps(true, true);

    // Khóa ngoại trỏ tới bảng users
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  // Khi rollback, bảng orders sẽ bị xóa trước, không lo lỗi khóa ngoại
  return knex.schema.dropTableIfExists("orders");
};
