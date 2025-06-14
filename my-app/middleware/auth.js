const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers["access-token"];

  if (!token) {
    return res.status(401).json({ status: "error", message: "Không có token" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: "error", message: "Token không hợp lệ" });
  }
};

module.exports = verifyToken;