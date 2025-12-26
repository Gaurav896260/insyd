const express = require("express");
const router = express.Router();
const { recordSale } = require("../controllers/sales.controller");

router.post("/", recordSale);

module.exports = router;
