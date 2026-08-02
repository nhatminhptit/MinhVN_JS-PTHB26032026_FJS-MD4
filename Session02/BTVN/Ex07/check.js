require("./app1");
require("./app2");
require("./app3");

const logger = require("./logger");

console.log(`\n=== KẾT QUẢ KIỂM TRA ===`);
console.log(`Số lần khởi tạo module logger (initCount): ${logger.initCount}`);
