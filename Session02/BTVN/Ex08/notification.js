const EventEmitter = require("events");

class NotificationCenter extends EventEmitter {}

const center = new NotificationCenter();

center.on("error", (err) => {
  console.error(`[CRITICAL] Hệ thống ghi nhận lỗi: ${err.message}`);
});

center.on("user:registered", (user) => {
  console.log(`[MAIL] Gửi welcome email tới ${user.email}`);
});

center.on("user:registered", (user) => {
  console.log(`[DB] Lưu thông tin user ${user.id} vào database`);
});

center.on("order:created", (order) => {
  console.log(`[EMAIL] Gửi xác nhận đơn #${order.id}`);
});

center.on("order:created", (order) => {
  console.log(`[STATS] Cập nhật doanh thu: +${order.total}`);
});

center.on("order:cancelled", (order) => {
  console.log(`[SMS] Gửi tin nhắn xin lỗi vì đơn #${order.id} bị hủy`);
});

center.on("order:cancelled", (order) => {
  if (order.total > 1000000) {
    center.emit(
      "error",
      new Error(
        `Đơn hàng #${order.id} hủy có giá trị quá lớn (${order.total} VND)! Cần rà soát.`,
      ),
    );
  } else {
    console.log(
      `[REFUND] Tiến hành hoàn tiền ${order.total} cho đơn #${order.id}`,
    );
  }
});

console.log("--- BẮT ĐẦU CHẠY KỊCH BẢN TEST ---");

center.emit("user:registered", { id: "U01", email: "khachhang1@gmail.com" });

center.emit("order:created", { id: 101, total: 500000 });

center.emit("order:cancelled", { id: 101, total: 500000 });

center.emit("order:created", { id: 102, total: 1500000 });

center.emit("order:cancelled", { id: 102, total: 1500000 });

center.emit("user:registered", { id: "U02", email: "khachhang2@gmail.com" });

console.log("--- KẾT THÚC KỊCH BẢN TEST ---");
