# Hệ thống Blog Nhiều Vai Trò (Bài 10)

## Danh sách API Endpoints

| Method | Endpoint | Middleware áp dụng | Mô tả |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/posts` | Không | Lấy danh sách toàn bộ bài viết. |
| **POST** | `/api/posts` | `upload.single('thumbnail')` | Tạo bài viết mới, cho phép upload ảnh hợp lệ. |
| **DELETE** | `/api/posts/:id` | `authenticate`, `authorize('admin')` | Xóa bài viết và toàn bộ comment thuộc về bài viết đó (Yêu cầu role admin). |
| **POST** | `/api/comments` | `authenticate` | Thêm comment vào một bài viết (Yêu cầu đăng nhập, kiểm tra postId hợp lệ). |

## Kịch bản Test (Minh chứng)

Dưới đây là 5 kịch bản test bằng Postman/Curl chứng minh hệ thống hoạt động đúng yêu cầu:

1. **Xóa bài viết khi chưa đăng nhập (Thiếu header Authorization)**
   - **Thao tác:** Gửi request `DELETE /api/posts/1` không có header.
   - **Kết quả mong đợi:** Status code `401 Unauthorized` kèm message `{"success": false, "message": "Chưa đăng nhập"}`.

2. **Xóa bài viết với quyền 'user' (Có header Authorization: user)**
   - **Thao tác:** Gửi request `DELETE /api/posts/1` với header `Authorization: user`.
   - **Kết quả mong đợi:** Status code `403 Forbidden` kèm message `{"success": false, "message": "Không đủ quyền truy cập"}` do middleware `authorize('admin')` chặn lại.

3. **Xóa bài viết với quyền 'admin' thành công và xóa comment liên quan**
   - **Thao tác:**
     - Tạo bài viết: `POST /api/posts`. Giả sử bài viết có `id` là 123.
     - Tạo comment: `POST /api/comments` với body `{"postId": 123, "content": "Hay quá"}` (cần gửi kèm header `Authorization: user`).
     - Xóa bài: Gửi request `DELETE /api/posts/123` với header `Authorization: admin`.
   - **Kết quả mong đợi:** Status code `200 OK` kèm message `{"success": true, "message": "Xóa bài viết và các comment liên quan thành công"}`.

4. **Tạo comment cho một bài viết không tồn tại**
   - **Thao tác:** Gửi request `POST /api/comments` với body `{"postId": 9999, "content": "Test lỗi"}` (kèm header `Authorization: user`).
   - **Kết quả mong đợi:** Status code `404 Not Found` kèm message `{"success": false, "message": "Không tìm thấy bài viết"}` do Controller chủ động bắn lỗi qua `AppError`.

5. **Upload ảnh vượt quá giới hạn 2MB khi tạo bài viết**
   - **Thao tác:** Gửi request `POST /api/posts` định dạng `form-data`, đính kèm 1 file lớn hơn 2MB vào key `thumbnail`.
   - **Kết quả mong đợi:** Status code `400 Bad Request` kèm message `{"success": false, "message": "File vượt quá dung lượng cho phép (2MB)"}` do Error Handling tập trung bắt được lỗi từ thư viện Multer.