const knex = require("knex")(require("./knexfile").development);

async function generateReport() {
  try {
    const query = knex("users")
      .leftJoin("orders", "users.id", "orders.user_id")
      .select(
        "users.name",
        knex.raw("COUNT(orders.id) as order_count"),
        knex.raw("SUM(orders.total) as total_spent"),
      )
      .groupBy("users.id", "users.name")
      .havingRaw("COUNT(orders.id) >= ?", [2])
      .orderBy("total_spent", "desc")
      .limit(3);

    console.log("=== CÂU SQL TẠO RA BẰNG .toString() ===");
    console.log(query.toString());
    console.log("\n========================================\n");

    const result = await query;

    console.log("=== KẾT QUẢ TRUY VẤN ===");
    console.table(result);
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    knex.destroy();
  }
}

generateReport();
