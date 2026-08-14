const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

// 1. Kết nối Database (Laragon MySQL mặc định: root, pass rỗng)
const sequelize = new Sequelize("sequelize_transaction", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Tắt log SQL cho dễ nhìn terminal
});

// 2. Khai báo Models
const Product = sequelize.define("Product", {
  name: DataTypes.STRING,
  price: DataTypes.INTEGER,
  stock: DataTypes.INTEGER, // Cột stock theo yêu cầu
});

const Order = sequelize.define("Order", {});

// Khai báo bảng trung gian order_items để chứa thêm cột qty (số lượng)
const OrderItem = sequelize.define(
  "OrderItem",
  {
    qty: DataTypes.INTEGER,
  },
  { tableName: "order_items" },
);

// Thiết lập quan hệ Many-to-Many
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

const app = express();
app.use(express.json());

app.post("/api/v1/orders", async (req, res) => {
  const { items } = req.body;

  // Khởi tạo Transaction
  const t = await sequelize.transaction();

  try {
    for (let item of items) {
      const product = await Product.findByPk(item.productId, {
        transaction: t,
      });

      if (!product) {
        throw {
          status: 404,
          message: `Không tìm thấy sản phẩm ID ${item.productId}`,
        };
      }

      if (product.stock < item.qty) {
        throw { status: 409, message: `Sản phẩm thiếu hàng: ${product.name}` };
      }
    }

    const order = await Order.create({}, { transaction: t });

    for (let item of items) {
      await order.addProduct(item.productId, {
        through: { qty: item.qty },
        transaction: t,
      });

      await Product.decrement("stock", {
        by: item.qty,
        where: { id: item.productId },
        transaction: t,
      });
    }

    await t.commit();
    res
      .status(200)
      .json({
        success: true,
        message: "Đặt hàng thành công",
        orderId: order.id,
      });
  } catch (error) {
    await t.rollback();
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message || "Lỗi server" });
  }
});

const PORT = 3000;
sequelize.sync({ force: true }).then(async () => {
  await Product.bulkCreate([
    { id: 1, name: "Bàn phím cơ", price: 1000, stock: 10 },
    { id: 2, name: "Chuột Gaming", price: 500, stock: 5 },
    { id: 5, name: "Màn hình 24inch", price: 3000, stock: 2 },
  ]);

  console.log("Đã khởi tạo Database và nạp dữ liệu mẫu!");

  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
  });
});
