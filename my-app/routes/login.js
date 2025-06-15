const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456";

router.get("/", (req, res) => {
  const phoneNumber = req.headers["phone-number"];

  if (!phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu header phone-number",
    });
  }

  const query = `
    SELECT Ma_khach_hang, Ten_khach_hang, So_dien_thoai
    FROM khach_hang
    WHERE So_dien_thoai = ? LIMIT 1
  `;

  db.query(query, [phoneNumber], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Lỗi kết nối cơ sở dữ liệu",
        error: err.message,
      });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "3h" });

      res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 3 * 60 * 60 * 1000, 
      });

      return res.json({
        status: "success",
        user,
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy khách hàng với số điện thoại đã cung cấp",
      });
    }
  });
});

module.exports = router;
