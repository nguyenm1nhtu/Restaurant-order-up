// routes/menu.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// lay tat ca cac mon an
router.get('/monan', (req, res) => {
  db.query('SELECT * FROM mon_an', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

// lay cac danh muc do an
router.get('/danhmuc', (req, res) => {
  db.query('SELECT * FROM danh_muc_mon_an', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }
    res.json(results);
  });
});

// Lấy thông tin món ăn theo ID
router.get('/monan/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM mon_an WHERE Ma_mon_an = ? and Ma_mon_an LIKE "MA%"', [id], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }

    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy món ăn');
    }

    res.json(results[0]);
  });
});


// Lấy thông tin danh mục món ăn theo ID
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


// Lấy thông tin món ăn theo danh mục món ăn
router.get('/danhmuc/:id/monan', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM mon_an WHERE Ma_danh_muc = ?', [id], (err, results) => {
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

  // GET /menu/search?keyword=bun
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

// lay combo cac mon an theo ID
router.get('/monan/:id', (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM mon_an m JOIN combo_chi_tiet c ON m.Ma_mon_an = c.Ma_mon_don WHERE c.Ma_combo = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).send('Lỗi truy vấn cơ sở dữ liệu');
    }

    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy món ăn');
    }

    res.json(results[0]);
  });
});



module.exports = router;
