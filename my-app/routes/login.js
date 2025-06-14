const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456";

router.get("/", (req, res) => {
  const token = req.cookies.access_token || req.headers["access-token"];

  // Trường hợp login bằng token
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const maKhachHang = decoded.ma_khach_hang;

      const query = "SELECT Ma_khach_hang FROM khach_hang WHERE Ma_khach_hang = ? LIMIT 1";
      db.query(query, [maKhachHang], (err, results) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: "Lỗi kết nối CSDL",
            error: err.message,
          });
        }

        if (results.length > 0) {
          const newToken = jwt.sign(
            { ma_khach_hang: maKhachHang },
            SECRET_KEY,
            { expiresIn: "3h" }
          );

          return res.json({
            status: "success",
            token: newToken,
          });
        } else {
          return res.status(404).json({
            status: "error",
            message: "Không tìm thấy khách hàng",
          });
        }
      });

      return;
    } catch (err) {
      // Token hết hạn hoặc không hợp lệ, tiếp tục kiểm tra phone
    }
  }

  // Trường hợp login bằng số điện thoại
  const phoneNumber = req.headers["phone-number"];

  if (!phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu access token hoặc header phone-number",
    });
  }

  const query = "SELECT Ma_khach_hang FROM khach_hang WHERE So_dien_thoai = ? LIMIT 1";
  db.query(query, [phoneNumber], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Lỗi kết nối cơ sở dữ liệu",
        error: err.message,
      });
    }

    if (results.length > 0) {
      const maKhachHang = results[0].Ma_khach_hang;

      const token = jwt.sign({ ma_khach_hang: maKhachHang }, SECRET_KEY, {
        expiresIn: "3h",
      });

      return res.json({
        status: "success",
        token: token,
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
