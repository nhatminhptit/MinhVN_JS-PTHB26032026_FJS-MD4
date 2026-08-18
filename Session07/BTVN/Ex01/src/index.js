require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;
const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
