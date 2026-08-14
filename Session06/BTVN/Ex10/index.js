const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    stock: Number,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    await Product.deleteMany({});

    await Product.collection.insertMany([
      {
        name: "Laptop Dell Cũ",
        price: 10000,
        category: "Laptop",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
      {
        name: "iPhone 12 Pro Cũ",
        price: 15000,
        category: "Mobile",
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      },
    ]);

    console.log(
      '[1] TRƯỚC KHI CHẠY SCRIPT (2 sản phẩm đầu không có trường "stock"):',
    );
    const beforeUpdate = await Product.find({});
    console.log(beforeUpdate);
    console.log("\n");

    await Product.updateMany(
      { stock: { $exists: false } },
      { $set: { stock: 10 } },
    );

    console.log(
      '[2] SAU KHI CHẠY SCRIPT (Tất cả sản phẩm cũ đã được bổ sung "stock: 10"):',
    );
    const afterUpdate = await Product.find({});
    console.log(afterUpdate);
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
