# Bài tập: Danh sách sản phẩm có phân trang, tìm kiếm, sắp xếp

## Công nghệ sử dụng
- Node.js & Express
- Sequelize ORM
- SQLite 

## Các Request Test cho Endpoint `GET /api/v1/products`

**1. Đủ tham số:**
- **Request:** `GET http://localhost:3000/api/v1/products?page=2&limit=5&keyword=sach&sort=price_asc`
- **Mô tả:** Lấy trang 2, mỗi trang 5 sản phẩm, tên chứa từ "sach", xếp theo giá tăng dần.

**2. Chỉ keyword:**
- **Request:** `GET http://localhost:3000/api/v1/products?keyword=lap`
- **Mô tả:** Lấy sản phẩm chứa từ "lap", các tham số khác giữ mặc định.

**3. Chỉ sort:**
- **Request:** `GET http://localhost:3000/api/v1/products?sort=price_desc`
- **Mô tả:** Lấy 10 sản phẩm đầu tiên, sắp xếp giá giảm dần.

**4. Không tham số:**
- **Request:** `GET http://localhost:3000/api/v1/products`
- **Mô tả:** Lấy mặc định trang 1, 10 sản phẩm, ID giảm dần.