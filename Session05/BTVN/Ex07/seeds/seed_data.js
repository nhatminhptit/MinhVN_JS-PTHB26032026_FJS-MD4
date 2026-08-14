exports.seed = async function (knex) {
  await knex("orders").del();
  await knex("users").del();

  await knex("users").insert([
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
    { id: 3, name: "Lê Văn C", email: "c@gmail.com" },
    { id: 4, name: "Phạm Thị D", email: "d@gmail.com" },
    { id: 5, name: "Vũ Nhật Minh", email: "minh@gmail.com" },
  ]);

  // Tạo 15 orders
  await knex("orders").insert([
    // User 1: 4 đơn (Tổng: 500)
    { user_id: 1, total: 100 },
    { user_id: 1, total: 150 },
    { user_id: 1, total: 200 },
    { user_id: 1, total: 50 },
    // User 2: 2 đơn (Tổng: 320)
    { user_id: 2, total: 300 },
    { user_id: 2, total: 20 },
    // User 3: 3 đơn (Tổng: 160)
    { user_id: 3, total: 50 },
    { user_id: 3, total: 80 },
    { user_id: 3, total: 30 },
    // User 4: 4 đơn (Tổng: 1240) -> Cao nhất
    { user_id: 4, total: 500 },
    { user_id: 4, total: 600 },
    { user_id: 4, total: 100 },
    { user_id: 4, total: 40 },
    // User 5: 2 đơn (Tổng: 1050)
    { user_id: 5, total: 1000 },
    { user_id: 5, total: 50 },
  ]);
};
