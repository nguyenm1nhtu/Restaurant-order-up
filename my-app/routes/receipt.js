const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/auth.js');


router.post('/cart/add', verifyToken, async (req, res) => {
  const { Ma_mon_an, So_luong, Ghi_chu } = req.body;
  const ma_khach_hang = req.user.Ma_khach_hang;

  try {
    // Tìm hóa đơn chưa thanh toán của người dùng
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Tinh_trang = 0',
      [ma_khach_hang]
    );

    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }

    const ma_hoa_don = hoaDon[0].Ma_hoa_don;

    // Kiểm tra món đã có trong giỏ chưa
    const [existing] = await db.promise().query(
      'SELECT * FROM chi_tiet_hoa_don WHERE Ma_hoa_don = ? AND Ma_mon_an = ?',
      [ma_hoa_don, Ma_mon_an]
    );

    if (existing.length > 0) {
      // Nếu có rồi thì cập nhật số lượng
      await db.promise().query(
        'UPDATE chi_tiet_hoa_don SET So_luong = So_luong + ? WHERE Ma_hoa_don = ? AND Ma_mon_an = ?',
        [So_luong, ma_hoa_don, Ma_mon_an]
      );
    } else {
      // Nếu chưa có thì thêm mới
      await db.promise().query(
        'INSERT INTO chi_tiet_hoa_don (Ma_hoa_don, Ma_mon_an, So_luong, Ghi_chu) VALUES (?, ?, ?, ?)',
        [ma_hoa_don, Ma_mon_an, So_luong, Ghi_chu || null]
      );
    }

    res.json({ message: 'Thêm món vào giỏ hàng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});



router.put('/cart/update', verifyToken, async (req, res) => {
  const { Ma_mon_an, So_luong } = req.body;
  const ma_khach_hang = req.user.user?.Ma_khach_hang || req.user.Ma_khach_hang;
  try {
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Tinh_trang = 0',
      [ma_khach_hang]
    );
    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }
    const ma_hoa_don = hoaDon[0].Ma_hoa_don;
    // Check if the item exists in chi_tiet_hoa_don
    const [existing] = await db.promise().query(
      'SELECT * FROM chi_tiet_hoa_don WHERE Ma_hoa_don = ? AND Ma_mon_an = ?',
      [ma_hoa_don, Ma_mon_an]
    );
    if (existing.length > 0) {
      // Update the quantity
      await db.promise().query(
        'UPDATE chi_tiet_hoa_don SET So_luong = ? WHERE Ma_hoa_don = ? AND Ma_mon_an = ?',
        [So_luong, ma_hoa_don, Ma_mon_an]
      );
    } else {
      // Insert new if not exists
      await db.promise().query(
        'INSERT INTO chi_tiet_hoa_don (Ma_hoa_don, Ma_mon_an, So_luong) VALUES (?, ?, ?)',
        [ma_hoa_don, Ma_mon_an, So_luong]
      );
    }
    res.json({ message: 'Cập nhật số lượng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});



router.delete('/cart/remove', verifyToken, async (req, res) => {
  const { Ma_mon_an } = req.body;
  const ma_khach_hang = req.user.ma_khach_hang;

  try {
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Trang_thai = 0',
      [ma_khach_hang]
    );

    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }

    const ma_hoa_don = hoaDon[0].Ma_hoa_don;

    await db.promise().query(
      'DELETE FROM Chi_tiet_hoa_don WHERE Ma_hoa_don = ? AND Ma_mon_an = ?',
      [ma_hoa_don, Ma_mon_an]
    );

    res.json({ message: 'Xóa món khỏi giỏ hàng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

// thanh toan
router.put('/checkout', verifyToken, async (req, res) => {
  const ma_khach_hang = req.user.ma_khach_hang;
  const phuong_thuc_thanh_toan = req.header['pttt'];

  try {
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Trang_thai = 1',
      [ma_khach_hang]
    );

    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }

    const ma_hoa_don = hoaDon[0].Ma_hoa_don;

    await db.promise().query(
      'UPDATE hoa_don SET Trang_thai = 2, Ma_phuong_thuc_thanh_toan = ? WHERE Ma_hoa_don = ?',
      [phuong_thuc_thanh_toan, ma_hoa_don]
    );

    res.json({ message: 'Cập nhật số lượng thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});


// API tính tiền hóa đơn
router.post('/tinh-tien/:maHoaDon', (req, res) => {
  const maHoaDon = req.params.maHoaDon;

  const sql = `
    SELECT SUM(ct.So_luong * m.Gia) AS tong_tien
    FROM chi_tiet_hoa_don ct
    JOIN mon_an m ON ct.Ma_mon_an = m.Ma_mon_an
    WHERE ct.Ma_hoa_don = ?
  `;

  db.query(sql, [maHoaDon], (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ message: 'Lỗi tính tiền' });
    }

    const tongTien = result[0].tong_tien || 0;
    const VAT = tongTien * 0.1; // Ví dụ VAT là 10%

    // Cập nhật tổng tiền và VAT vào hóa đơn
    const updateSql = `
      UPDATE hoa_don
      SET Tong_tien = ?, VAT = ?
      WHERE Ma_hoa_don = ?
    `;

    db.query(updateSql, [tongTien, VAT, maHoaDon], (updateErr) => {
      if (updateErr) {
        console.error('Lỗi cập nhật hóa đơn:', updateErr);
        return res.status(500).json({ message: 'Lỗi cập nhật hóa đơn' });
      }

      res.json({
        message: 'Tính tiền thành công',
        data: {
          tong_tien: tongTien,
          VAT: VAT,
          tong_cong: tongTien + VAT
        }
      });
    });
  });
});


// hien mon an trong gio hang
router.get('/cart/monan', verifyToken, (req, res) => {
  // Debug: log the full req.user object
  console.log('req.user:', req.user);
  const maKhachHang = req.user.user?.Ma_khach_hang || req.user.Ma_khach_hang;
  console.log('maKhachHang:', maKhachHang);
  db.query('SELECT m.Ma_mon_an, Ten_mon_an, Don_gia, So_luong, Hinh_anh FROM mon_an m join chi_tiet_hoa_don cthd on m.Ma_mon_an = cthd.Ma_mon_an join hoa_don hd on cthd.Ma_hoa_don = hd.Ma_hoa_don where Ma_khach_hang = ? and Tinh_trang = 0',
     [maKhachHang], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
})

// Update total amount in hoa_don
router.put('/update-total', verifyToken, async (req, res) => {
  const { tong_tien } = req.body;
  const ma_khach_hang = req.user.user?.Ma_khach_hang || req.user.Ma_khach_hang;
  try {
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Tinh_trang = 0',
      [ma_khach_hang]
    );
    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }
    const ma_hoa_don = hoaDon[0].Ma_hoa_don;
    await db.promise().query(
      'UPDATE hoa_don SET Tong_tien = ? WHERE Ma_hoa_don = ?',
      [tong_tien, ma_hoa_don]
    );
    res.json({ message: 'Cập nhật tổng tiền thành công' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

router.put('/confirm-order', verifyToken, async (req, res) => {
  const ma_khach_hang = req.user.user?.Ma_khach_hang || req.user.Ma_khach_hang;
  try {
    const [hoaDon] = await db.promise().query(
      'SELECT Ma_hoa_don FROM hoa_don WHERE Ma_khach_hang = ? AND Tinh_trang = 0',
      [ma_khach_hang]
    );
    if (hoaDon.length === 0) {
      return res.status(400).json({ message: 'Chưa có hóa đơn đang mở' });
    }
    const ma_hoa_don = hoaDon[0].Ma_hoa_don;
    await db.promise().query(
      'UPDATE hoa_don SET Tinh_trang = 1 WHERE Ma_hoa_don = ?',
      [ma_hoa_don]
    );
    res.json({ message: 'Đã xác nhận đặt món, hóa đơn chuyển sang trạng thái chờ thanh toán.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});

module.exports = router;
