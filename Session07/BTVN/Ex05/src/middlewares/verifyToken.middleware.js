const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: 401,
      message: "TOKEN_REQUIRED",
      errors: null,
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secretKey = process.env.JWT_ACCESS_SECRET;
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "INVALID_OR_EXPIRED_TOKEN",
      errors: error.message,
    });
  }
};

module.exports = verifyToken;
