const express = require('express');
const router = express.Router();
const db = require('../db');

// Lấy tất cả các món ăn
router.get('/monan', (req, res) => {
  db.query('SELECT * FROM mon_an', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

// Lấy tất cả danh mục món ăn
router.get('/danhmuc', (req, res) => {
  db.query('SELECT * FROM danh_muc_mon_an limit 5', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

// Lấy thông tin món ăn theo ID (món đơn hoặc combo)
router.get('/monan/:id', (req, res) => {
  const id = req.params.id;

  if (1 === 1) {
    // Truy vấn món đơn
    db.query(
      'SELECT Ma_mon_an, Ten_mon_an, Mo_ta, Don_gia, Hinh_anh, Ma_danh_muc FROM mon_an WHERE Ma_mon_an = ?',
      [id],
      (err, results) => {
        if (err) {
          console.error('Lỗi truy vấn:', err);
          return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
        }
        if (results.length === 0) {
          return res.status(404).send('Không tìm thấy món ăn');
        }
        res.json(results[0]);
      }
    );
  }
});

// Lấy thông tin danh mục theo ID
router.get('/danhmuc/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM danh_muc_mon_an WHERE Ma_danh_muc = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy danh mục món ăn');
    }
    res.json(results[0]);
  });
});

// Lấy các món ăn thuộc danh mục cụ thể
router.get('/danhmuc/:id/monan', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM mon_an WHERE Ma_danh_muc = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    if (results.length === 0) {
      return res.status(404).send('Không có món ăn nào thuộc danh mục này');
    }
    res.json(results);
  });
});

// Tìm kiếm món ăn theo tên
router.get('/search', (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm qua query: ?keyword=' });
  }

  const searchTerm = `%${keyword}%`;
  const sql = 'SELECT * FROM mon_an WHERE Ten_mon_an LIKE ?';

  db.query(sql, [searchTerm], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

module.exports = router;
