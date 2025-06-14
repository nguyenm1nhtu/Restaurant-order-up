const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456";

router.get("/", (req, res) => {
  const token = req.cookies.access_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const maKhachHang = decoded.ma_khach_hang;

      const query = "SELECT * FROM khach_hang WHERE Ma_khach_hang = ? LIMIT 1";
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

          res.cookie("access_token", newToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
          });

          return res.json({
            
            status: "success",
            data: results[0],
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
      
    }
  }
  const phoneNumber = req.headers["phone-number"];

  if (!phoneNumber) {
    return res.status(400).json({
      status: "error",
      message: "Thiếu access token hoặc header phone-number",
    });
  }

  const query = "SELECT * FROM khach_hang WHERE So_dien_thoai = ? LIMIT 1";
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

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });

      return res.json({
        status: "success",
        data: results[0],
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
