require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;
const accessTokenSecret = process.env.JWT_ACCESS_SECRET;

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
