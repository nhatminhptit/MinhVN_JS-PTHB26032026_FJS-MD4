const orderService = require("./orderService");

const getTimestamp = () => {
  return new Date().toISOString();
};

orderService.on("order:created", (order) => {
  console.log(`[${getTimestamp()}] Đơn hàng #${order.id} - created`);
});

orderService.on("order:processed", (order) => {
  console.log(`[${getTimestamp()}] Đơn hàng #${order.id} - processed`);
});
