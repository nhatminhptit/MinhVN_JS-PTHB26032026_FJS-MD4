USE quanly_sinhvien;

INSERT INTO sinh_vien (ho_ten, ngay_sinh, diem_gpa)
VALUES ('Vu Nhat Minh', '2006-03-31', 3.2);

INSERT INTO sinh_vien (ho_ten, ngay_sinh, diem_gpa)
VALUES 
    ('Tran Thi Lan', '2005-02-20', 3.5),
    ('Le Hoang Nam', '2004-11-08', 3.2),
    ('Pham Tuan Anh', '2005-07-12', 4.0),
    ('Hoang Thi Mai', '2004-09-25', 3.6),
    ('Vu Duc Hai', '2005-01-30', 2.9);
    
SELECT * FROM sinh_vien;