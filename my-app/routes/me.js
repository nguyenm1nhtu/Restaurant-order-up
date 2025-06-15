const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

router.get("/", verifyToken, (req, res) => {
  res.json({
    status: "success",
    user: req.user?.user || req.user
  });
});

module.exports = router;
