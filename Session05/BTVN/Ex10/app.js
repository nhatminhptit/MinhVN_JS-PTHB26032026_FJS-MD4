const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("n1_practice", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const Category = sequelize.define(
  "Category",
  {
    name: DataTypes.STRING,
  },
  { timestamps: false },
);

const Product = sequelize.define(
  "Product",
  {
    name: DataTypes.STRING,
  },
  { timestamps: false },
);

Category.hasMany(Product, { foreignKey: "categoryId", as: "products" });
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });

const app = express();

app.use((req, res, next) => {
  req.startTime = Date.now();
  req.queryCount = 0;

  req.logQuery = (sql) => {
    req.queryCount++;
  };

  next();
});

app.get("/api/v1/report/slow", async (req, res) => {
  try {
    // Truy vấn 1: Lấy danh sách Categories
    const categories = await Category.findAll({ logging: req.logQuery });

    const data = [];
    for (let cat of categories) {
      const products = await Product.findAll({
        where: { categoryId: cat.id },
        logging: req.logQuery,
      });

      data.push({
        ...cat.toJSON(),
        products: products,
      });
    }

    const durationMs = Date.now() - req.startTime;

    return res.status(200).json({
      success: true,
      data: data,
      meta: {
        queryCount: req.queryCount,
        durationMs: durationMs,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/v1/report/fast", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        {
          model: Product,
          as: "products",
        },
      ],
      logging: req.logQuery,
    });

    const durationMs = Date.now() - req.startTime;

    return res.status(200).json({
      success: true,
      data: categories,
      meta: {
        queryCount: req.queryCount,
        durationMs: durationMs,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3000;

sequelize.sync({ force: true }).then(async () => {
  console.log("Đang nạp dữ liệu mẫu (50 Categories x 10 Products)...");

  for (let i = 1; i <= 50; i++) {
    const category = await Category.create({ name: `Danh mục ${i}` });
    const products = [];
    for (let j = 1; j <= 10; j++) {
      products.push({ name: `Sản phẩm ${i}-${j}`, categoryId: category.id });
    }
    await Product.bulkCreate(products);
  }

  console.log("Nạp dữ liệu thành công!");

  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
    console.log(`Test SLOW: http://localhost:3000/api/v1/report/slow`);
    console.log(`Test FAST: http://localhost:3000/api/v1/report/fast`);
  });
});
