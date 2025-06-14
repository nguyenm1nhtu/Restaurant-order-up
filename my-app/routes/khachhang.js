// routes/khachhang.js
const express = require('express');
const router = express.Router();
const db = require('../db');

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

module.exports = router;
