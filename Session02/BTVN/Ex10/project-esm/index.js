import "./logger.js";
import orderService from "./orderService.js";

console.log("--- HỆ THỐNG BẮT ĐẦU NHẬN ĐƠN HÀNG ---");

orderService.createOrder({ id: "ORD-001" });
orderService.createOrder({ id: "ORD-002" });
