CREATE DATABASE quanly_sinhvien;
USE quanly_sinhvien;
CREATE TABLE sinh_vien (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(255) NOT NULL,
    ngay_sinh DATE,
    diem_gpa FLOAT
);
DESCRIBE sinh_vien;