const EventEmitter = require("events");

class OrderService extends EventEmitter {}

const service = new OrderService();

service.on("order:created", (data) => {
  console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${data.id}`);
});

service.once("order:created", () => {
  console.log(`[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống`);
});

service.emit("order:created", { id: 1, total: 100000 });

service.emit("order:created", { id: 2, total: 250000 });

service.emit("order:created", { id: 3, total: 75000 });