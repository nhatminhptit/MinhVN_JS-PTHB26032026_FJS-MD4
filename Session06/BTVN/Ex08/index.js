const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: String,
    location: {
      street: String,
      district: String,
      city: String,
    },
  },
  {
    timestamps: true,
  },
);

const Store = mongoose.model("Store", storeSchema);

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

    console.log("--- ĐANG TẠO MỚI CỬA HÀNG ---");

    const newStore = new Store({
      name: "Cửa hàng Tiện lợi 24/7",
      location: {
        street: "123 Đường Nguyễn Huệ",
        district: "Quận 1",
        city: "Hồ Chí Minh",
      },
    });

    const savedStore = await newStore.save();

    console.log(
      "=> Tạo thành công! Cấu trúc JSON trả về thể hiện rõ quan hệ cha-con:",
    );
    console.log(savedStore);
  } catch (error) {
    console.error("Lỗi khi thao tác với database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\nĐã đóng kết nối MongoDB.");
  }
}

run();
