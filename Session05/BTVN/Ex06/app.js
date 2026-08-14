const express = require("express");
const sequelize = require("./database");
const { getProducts } = require("./controller");

const app = express();

app.get("/api/v1/products", getProducts);

const PORT = 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
});
