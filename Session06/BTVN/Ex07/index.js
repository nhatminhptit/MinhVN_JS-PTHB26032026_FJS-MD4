const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

async function runTest() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    await Product.deleteMany({});

    await Product.insertMany([
      { name: "Dell XPS 13", price: 15000, category: "Laptop" },
      { name: "iPhone 14 Pro", price: 18000, category: "Mobile" },
      { name: "Bàn phím cơ", price: 2000, category: "Phụ kiện" },
      { name: "Macbook Pro", price: 45000, category: "Laptop" },
    ]);

    const matchedProducts = await Product.find({
      category: { $in: ["Laptop", "Mobile"] },
      price: { $lt: 20000 },
    });

    console.log("=> Danh sách Sản phẩm (Laptop / Mobile) có giá < 20.000:");
    console.log(matchedProducts);
  } catch (error) {
    console.error("Lỗi:", error);
  } finally {
    await mongoose.disconnect();
  }
}

runTest();
