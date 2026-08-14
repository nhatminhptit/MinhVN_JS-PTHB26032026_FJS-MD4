const sequelize = require("./database");
const Product = require("./Product");

const seedData = async () => {
  await sequelize.sync({ force: true });

  await Product.bulkCreate([
    { name: "Sách giáo khoa Toán", price: 50000 },
    { name: "Sách tham khảo Lý", price: 60000 },
    { name: "Laptop Lenovo Legion", price: 25000000 },
    { name: "Laptop Lenovo LOQ", price: 20000000 },
    { name: "Chuột Logitech G903", price: 2500000 },
    { name: "Bàn phím cơ", price: 1500000 },
    { name: "Màn hình máy tính", price: 4000000 },
    { name: "Sách lập trình Nodejs", price: 120000 },
    { name: "Sách lập trình C++", price: 100000 },
    { name: "Tai nghe gaming", price: 800000 },
    { name: "Balo laptop", price: 500000 },
    { name: "Sách học TOEIC", price: 150000 },
  ]);

  console.log("Đã tạo xong dữ liệu mẫu! Nhấn Ctrl+C để thoát.");
};

seedData();
