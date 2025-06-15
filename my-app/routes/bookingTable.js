const express = require("express");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

router.post("/", verifyToken, (req, res) => {
  try {
    console.log("Request received for /bookingTable"); // Log khi nhận request
    const maKhachHang = req.user.ma_khach_hang;
    const { numberOfPeople, table } = req.body;

    console.log("Received data:", { numberOfPeople, table }); // Debug dữ liệu đầu vào

    if (!table) {
      return res.status(400).json({
        status: "error",
        message: "Thiếu thông tin bàn",
      });
    }

    if (numberOfPeople <= 0) {
      return res.status(400).json({
        status: "error",
        message: "Số người phải lớn hơn 0",
      });
    }

    // Kiểm tra bàn có tồn tại và trạng thái
    const checkTableQuery =
      "SELECT Trang_thai, Suc_chua FROM ban_an WHERE Ma_ban = ?";
    db.query(checkTableQuery, [table], (err, result) => {
      if (err) {
        console.error("Check table error:", err);
        return res.status(500).json({
          status: "error",
          message: "Lỗi khi kiểm tra bàn",
          error: err.message,
        });
      }

      if (result.length === 0) {
        console.log("No table found for Ma_ban:", table); // Debug
        return res.status(404).json({
          status: "error",
          message: "Bàn không tồn tại",
        });
      }

      console.log("Raw query result:", result); // Debug toàn bộ result
      if (!result[0] || typeof result[0] !== "object") {
        console.error("Invalid result format:", result);
        return res.status(500).json({
          status: "error",
          message: "Dữ liệu bàn không hợp lệ",
        });
      }

      const { Trang_thai, Suc_chua } = result[0];
      console.log("Table status:", { Ma_ban: table, Trang_thai, Suc_chua }); // Debug trạng thái

      // Xử lý trường hợp Trang_thai null hoặc undefined
      const status = Trang_thai ? String(Trang_thai).toUpperCase() : "UNKNOWN";
      console.log("Processed status:", status); // Debug trạng thái đã xử lý
      if (status !== "AVAILABLE") {
        return res.status(400).json({
          status: "error",
          message: `Bàn ${table} đã được đặt hoặc đang sử dụng (trạng thái: ${status})`,
        });
      }

      if (numberOfPeople > Suc_chua) {
        return res.status(400).json({
          status: "error",
          message: `Số người (${numberOfPeople}) vượt quá sức chứa (${Suc_chua}) của bàn`,
        });
      }

      // Cập nhật trạng thái bàn
      const updateTableQuery =
        "UPDATE ban_an SET Trang_thai = 'RESERVED' WHERE Ma_ban = ?";
      db.query(updateTableQuery, [table], (err, resultUpdate) => {
        if (err) {
          console.error("Update table error:", err);
          return res.status(500).json({
            status: "error",
            message: "Lỗi khi cập nhật trạng thái bàn",
            error: err.message,
          });
        }

        if (resultUpdate.affectedRows === 0) {
          return res.status(404).json({
            status: "error",
            message: "Bàn không tồn tại hoặc đã được đặt",
          });
        }

        // Tạo hóa đơn
        const countQuery = "SELECT COUNT(*) AS count FROM hoa_don";
        db.query(countQuery, (err2, resultCount) => {
          if (err2) {
            console.error("Count invoice error:", err2);
            return res.status(500).json({
              status: "error",
              message: "Lỗi khi đếm hóa đơn",
              error: err2.message,
            });
          }

          const count = resultCount[0].count;
          const nextNumber = count + 1;
          const maHoaDon =
            nextNumber < 100
              ? `HD${String(nextNumber).padStart(3, "0")}`
              : `HD${nextNumber}`;

          const insertInvoiceQuery = `
                        INSERT INTO hoa_don (Ma_hoa_don, Ma_khach_hang, Ma_ban, Thoi_gian_tao, Thoi_gian_cap_nhat)
                        VALUES (?, ?, ?, NOW(), NOW())
                    `;

          db.query(
            insertInvoiceQuery,
            [maHoaDon, maKhachHang, table],
            (err3, resultInsert) => {
              if (err3) {
                console.error("Insert invoice error:", err3);
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
            }
          );
        });
      });
    });
  } catch (error) {
    console.error("Internal error:", error);
    return res.status(500).json({
      status: "error",
      message: "Lỗi nội bộ",
      error: error.message,
    });
  }
});

module.exports = router;
