USE quanly_sinhvien;

SELECT * FROM sinh_vien WHERE id = 1;
UPDATE sinh_vien 
SET email = 'vnm@ptit.edu.vn' 
WHERE id = 1;
SELECT * FROM sinh_vien WHERE id = 1;

SELECT * FROM sinh_vien WHERE id = 2;
DELETE FROM sinh_vien
WHERE id = 2;
SELECT * FROM sinh_vien WHERE id = 2;