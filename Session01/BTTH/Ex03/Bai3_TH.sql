USE quanly_sinhvien;

DESCRIBE sinh_vien;

ALTER TABLE sinh_vien 
ADD COLUMN email VARCHAR(255);
DESCRIBE sinh_vien;

ALTER TABLE sinh_vien 
MODIFY COLUMN diem_gpa DECIMAL(4,2);
DESCRIBE sinh_vien;
ALTER TABLE sinh_vien 
DROP COLUMN ngay_sinh;
DESCRIBE sinh_vien;