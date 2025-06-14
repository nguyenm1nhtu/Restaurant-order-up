// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // tài khoản của bạn
  database: 'Nhahang'
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối:', err);
    return;
  }
  console.log('✅ Kết nối MySQL thành công!');
});

module.exports = connection;
