### 1. Dự đoán

A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate

### 2. Kết quả thực tế

A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout
setImmediate

### 3. Giải thích

Đầu tiên, hệ thống sẽ thực thi các đoạn code đồng bộ từ trên xuống dưới, do đó 'A: Bắt đầu' và 'B: Kết thúc đồng bộ' được đưa vào Call Stack và in ra ngay lập tức. Sau khi các tác vụ đồng bộ kết thúc, Event Loop sẽ ưu tiên xử lý hàng đợi Microtask Queue. Trong hàng đợi này, `process.nextTick()` luôn có độ ưu tiên cao nhất (chạy trước cả Promise) nên sẽ in ra 'nextTick', tiếp theo mới đến `Promise`. Cuối cùng, Event Loop mới chuyển sang nhóm Macrotask, đi qua phase Timers để xử lý `setTimeout` trước, rồi mới tới phase Check để xử lý `setImmediate`.
