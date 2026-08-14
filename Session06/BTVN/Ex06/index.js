const mongoose = require("mongoose");

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("Kết nối MongoDB thành công!\n");

    await testDatabase();
  } catch (error) {
    console.error("Lỗi kết nối database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sản phẩm bắt buộc phải có"],
      minLength: [5, "Tên sản phẩm phải có tối thiểu 5 ký tự"],
    },
    price: {
      type: Number,
      required: [true, "Giá sản phẩm bắt buộc phải có"],
      min: [0, "Giá sản phẩm không được là số âm"],
    },
    category: {
      type: String,
      required: [true, "Danh mục bắt buộc phải có"],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

async function testDatabase() {
  try {
    console.log("--- TEST 1: LƯU SẢN PHẨM HỢP LỆ ---");
    const validProduct = new Product({
      name: "Laptop Gaming", 
      price: 20000000, 
      category: "Máy tính",
    });

    const savedProduct = await validProduct.save(); 
    console.log("=> Lưu THÀNH CÔNG sản phẩm hợp lệ:");
    console.log(`ID: ${savedProduct._id}`);
    console.log(`Tạo lúc: ${savedProduct.createdAt}\n`);

    console.log("--- TEST 2: LƯU SẢN PHẨM VI PHẠM VALIDATION ---");
    console.log("=> Đang cố gắng lưu sản phẩm lỗi vào DB...");

    const invalidProduct = new Product({
      name: "Áo", 
      price: -50000, 
      category: "Thời trang",
    });

    await invalidProduct.save();
  } catch (error) {
    if (error.name === "ValidationError") {
      console.log("\n[!] BẮT ĐƯỢC LỖI VALIDATION:");
      for (let field in error.errors) {
        console.log(
          `- Lỗi ở trường '${field}': ${error.errors[field].message}`,
        );
      }
    } else {
      console.error("Lỗi không xác định:", error);
    }
  }
}

run();