USE LibraryDB;

INSERT INTO Books (Title, Author, PublishedYear)
VALUES 
	('Clean Code', 'Robert C. Martin', 2008),
    ('The Pragmatic Programmer', 'Andrew Hunt', 1999),
    ('Design Patterns', 'Erich Gamma', 1994);
    
SELECT * FROM Books;

SELECT * FROM Books WHERE BookID = 2;
UPDATE Books 
SET PublishedYear = 2024 
WHERE BookID = 2;
SELECT * FROM Books WHERE BookID = 2;

SELECT * FROM Books WHERE BookID = 3;
DELETE FROM Books 
WHERE BookID = 3;
SELECT * FROM Books;