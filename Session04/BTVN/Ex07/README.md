# Báo cáo Test API Header Versioning

## 1. Test Version 1 (v1) - Cảnh báo Deprecation
- **Request**: `GET http://localhost:3000/api/books`
- **Headers truyền lên**: `Api-Version: v1` (hoặc không truyền)
- **Response Body**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin"
    },
    {
      "id": 2,
      "title": "The Pragmatic Programmer",
      "author": "Andrew Hunt"
    }
  ]
}
```
- **Response Headers (Ảnh chụp minh họa dạng text)**:
```text
HTTP/1.1 200 OK
X-Powered-By: Express
Deprecation: true
Sunset: Wed, 31 Dec 2025 23:59:59 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 135
```

## 2. Test Version 2 (v2) - Dữ liệu đầy đủ
- **Request**: `GET http://localhost:3000/api/books`
- **Headers truyền lên**: `Api-Version: v2`
- **Response Body**:
```json
{
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": {
        "id": 101,
        "name": "Robert C. Martin"
      },
      "publishedYear": 2008
    },
    {
      "id": 2,
      "title": "The Pragmatic Programmer",
      "author": {
        "id": 102,
        "name": "Andrew Hunt"
      },
      "publishedYear": 1999
    }
  ]
}
```

## 3. Test Version 9 (v9) - Version không hỗ trợ
- **Request**: `GET http://localhost:3000/api/books`
- **Headers truyền lên**: `Api-Version: v9`
- **HTTP Status**: `400 Bad Request`
- **Response Body**:
```json
{
  "code": "UNSUPPORTED_API_VERSION",
  "message": "Phiên bản API 'v9' không được hỗ trợ."
}
```