const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  try {
    const query = "SELECT * FROM ban_an WHERE Trang_thai = 'AVAILABLE'";

    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Lỗi khi truy vấn danh sách bàn khả dụng",
          error: err.message,
        });
      }

      return res.json({
        status: "success",
        data: results,
      });
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Lỗi nội bộ",
      error: error.message,
    });
  }
});

module.exports = router;
