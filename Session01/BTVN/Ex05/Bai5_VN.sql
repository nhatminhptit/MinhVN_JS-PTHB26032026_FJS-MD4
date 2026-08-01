CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255)
);
DESCRIBE Customers;

CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate DATETIME,
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
DESCRIBE Orders;

INSERT INTO Customers (FullName, Email)
VALUES 
    ('Nguyen Van A', 'nguyenvana@example.com'),
    ('Tran Thi B', 'tranthib@example.com');
SELECT * FROM Customers;

INSERT INTO Orders (OrderDate, CustomerID)
VALUES 
    ('2026-07-25 09:30:00', 1),
    ('2026-07-26 14:15:00', 1),
    ('2026-07-26 16:45:00', 2);
    
SELECT * FROM Orders;
    
SELECT 
    Orders.OrderID AS 'Mã đơn hàng', 
    Orders.OrderDate AS 'Ngày đặt hàng', 
    Customers.FullName AS 'Tên khách hàng'
FROM 
    Orders
JOIN 
    Customers ON Orders.CustomerID = Customers.CustomerID;