USE quanly_sinhvien;

SELECT 
    ho_ten AS 'Họ và Tên', 
    diem_gpa AS 'Điểm Tích Lũy' 
FROM sinh_vien;

SELECT 
    id, 
    ho_ten, 
    diem_gpa 
FROM sinh_vien 
WHERE diem_gpa >= 3.2 AND diem_gpa <= 4.0;

SELECT 
    id, 
    ho_ten, 
    email, 
    diem_gpa 
FROM sinh_vien 
WHERE ho_ten LIKE '%Minh%';

SELECT 
    id, 
    ho_ten, 
    diem_gpa 
FROM sinh_vien 
ORDER BY diem_gpa DESC 
LIMIT 3;