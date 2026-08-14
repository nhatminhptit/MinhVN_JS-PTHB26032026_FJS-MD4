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

const orderSchema = new mongoose.Schema(
  {
    orderNumber: String,
    product_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product", 
    },
    quantity: Number,
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    await Product.deleteMany({});
    await Order.deleteMany({});

    console.log("--- ĐANG TẠO DỮ LIỆU MẪU ---");

    const newProduct = new Product({
      name: "iPhone 15 Pro Max",
      price: 30000,
      category: "Mobile",
    });
    const savedProduct = await newProduct.save();
    console.log(`=> Đã tạo Sản phẩm: ${savedProduct.name}`);

    const newOrder = new Order({
      orderNumber: "ORD-2023-001",
      product_id: savedProduct._id, 
      quantity: 2,
    });
    const savedOrder = await newOrder.save();
    console.log(`=> Đã tạo Đơn hàng: ${savedOrder.orderNumber}\n`);

    console.log("--- [1] KẾT QUẢ KHI KHÔNG DÙNG POPULATE ---");
    const orderWithoutPopulate = await Order.findById(savedOrder._id);
    console.log(orderWithoutPopulate);
    console.log("\n");

    console.log("--- [2] KẾT QUẢ SAU KHI DÙNG POPULATE ---");
    const orderWithPopulate = await Order.findById(savedOrder._id).populate(
      "product_id",
    );
    console.log(orderWithPopulate);
  } catch (error) {
    console.error("Lỗi hệ thống:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
