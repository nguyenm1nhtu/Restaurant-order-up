const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
  try {
    const maKhachHang = req.user.ma_khach_hang;
    const table = req.headers["dat-ban"];

    if (!table) {
      return res.status(400).json({
        status: "error",
        message: "Thiếu header 'dat-ban'",
      });
    }

    const updateTableQuery = "UPDATE ban_an SET Trang_thai = 'RESERVED' WHERE Ma_ban = ?";
    db.query(updateTableQuery, [table], (err, resultUpdate) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Lỗi khi cập nhật trạng thái bàn",
          error: err.message,
        });
      }

      const countQuery = "SELECT COUNT(*) AS count FROM hoa_don";
      db.query(countQuery, (err2, resultCount) => {
        if (err2) {
          return res.status(500).json({
            status: "error",
            message: "Lỗi khi đếm hóa đơn",
            error: err2.message,
          });
        }

        const count = resultCount[0].count;
        const nextNumber = count + 1;
        const maHoaDon = nextNumber < 100 ? `HD${String(nextNumber).padStart(3, "0")}` : `HD${nextNumber}`;

        const insertInvoiceQuery = `
          INSERT INTO hoa_don (Ma_hoa_don, Ma_khach_hang, Ma_ban, Thoi_gian_tao, Thoi_gian_cap_nhat)
          VALUES (?, ?, ?, NOW(), NOW())
        `;

        db.query(insertInvoiceQuery, [maHoaDon, maKhachHang, table], (err3, resultInsert) => {
          if (err3) {
            return res.status(500).json({
              status: "error",
              message: "Lỗi khi tạo hóa đơn",
              error: err3.message,
            });
          }

          return res.json({
            status: "success",
            message: "Đặt bàn và tạo hóa đơn thành công",
            ma_hoa_don: maHoaDon,
            ma_ban: table,
            affectedRows: resultUpdate.affectedRows,
          });
        });
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
