// routes/khachhang.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../middleware/auth');

// Lấy tất cả khách hàng
router.get('/', (req, res) => {
  db.query('SELECT * FROM khach_hang', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

router.get('/profile', verifyToken, (req, res) => {
  const userId = req.user.Ma_khach_hang;
  if (!userId) {
    return res.status(401).send('Bạn chưa đăng nhập');
  }

  db.query('SELECT kh.Ten_khach_hang, kh.So_dien_thoai, tv.Email, htv.Ten_hang_thanh_vien FROM khach_hang kh join thanh_vien tv on kh.Ma_khach_hang = tv.Ma_khach_hang join hang_thanh_vien htv on tv.Ma_hang_thanh_vien = htv.Ma_hang_thanh_vien WHERE Ma_khach_hang = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }

    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy khách hàng');
    }

    res.json(results[0]);
  });
});

router.put('profile/update', verifyToken, (req, res) => {
  const userId = req.user.Ma_khach_hang;
  const { Ten_khach_hang, Email } = req.body;

  if (!userId) {
    return res.status(401).send('Bạn chưa đăng nhập');
  }

  db.query('UPDATE khach_hang SET Ten_khach_hang = ? WHERE Ma_khach_hang = ?', [Ten_khach_hang, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Không tìm thấy khách hàng để cập nhật');
    }

    // Cập nhật email trong bảng thanh_vien
    db.query('UPDATE thanh_vien SET Email = ? WHERE Ma_khach_hang = ?', [Email, userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
      }

      res.json({ message: 'Cập nhật thông tin thành công' });
    });
  });
});
module.exports = router;
