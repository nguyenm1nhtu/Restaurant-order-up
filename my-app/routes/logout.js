const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.clearCookie('access-token'); // Fixed cookie name to match login
    res.json({ status: 'success', message: 'Logged out' });
});

module.exports = router;
