require("./logger");

const orderService = require("./orderService");

console.log("--- HỆ THỐNG BẮT ĐẦU NHẬN ĐƠN HÀNG ---");

orderService.createOrder({ id: "ORD-001" });
orderService.createOrder({ id: "ORD-002" });
