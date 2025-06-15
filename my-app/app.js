const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// Routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const meRouter = require('./routes/me'); // ✅ Added
const bookingTableRouter = require('./routes/bookingTable');
const khachHangRouter = require('./routes/khachhang');
const menuRouter = require('./routes/menu');
const receiptRouter = require('./routes/receipt');
const logoutRouter = require('./routes/logout');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // Frontend origin
  credentials: true
}));

// View engine setup (if using EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/me', meRouter);              // ✅ Add this line
app.use('/bookingTable', bookingTableRouter);
app.use('/khachhang', khachHangRouter);
app.use('/menu', menuRouter);
app.use('/receipt', receiptRouter);
app.use('/logout', logoutRouter);


// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

module.exports = app;
