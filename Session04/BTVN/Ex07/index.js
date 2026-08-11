// index.js
const express = require("express");
const booksData = require("./data/books");
const versionResolver = require("./middlewares/versionResolver");

const app = express();
const PORT = 3000;

app.use(versionResolver);

app.get("/api/books", (req, res) => {
  const version = req.apiVersion;

  if (version === "v1") {
    res.setHeader("Deprecation", "true");
    res.setHeader("Sunset", "Wed, 31 Dec 2025 23:59:59 GMT");

    const formattedData = booksData.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author.name,
    }));

    return res.json({ data: formattedData });
  }

  if (version === "v2") {
    const formattedData = booksData.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
    }));

    return res.json({ data: formattedData });
  }

  return res.status(400).json({
    code: "UNSUPPORTED_API_VERSION",
    message: `Phiên bản API '${version}' không được hỗ trợ.`,
  });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
