### Lựa chọn chuẩn Module
Sử dụng chuẩn **CommonJS (CJS)**.

### Lý do lựa chọn:
1. CommonJS là chuẩn mặc định của Node.js, không yêu cầu phải cấu hình thêm `"type": "module"` trong file `package.json`.
2. Lợi dụng cơ chế Cache của require(): Khi khởi tạo đối tượng `new OrderService()` và export ở file `orderService.js`, các file `logger.js` và `index.js` khi gọi `require('./orderService')` sẽ nhận được **cùng một instance duy nhất** (nhờ cơ chế lưu cache module đã nạp của CJS). Điều này đảm bảo `logger` đang lắng nghe đúng trên đối tượng mà `index` đang phát ra sự kiện.