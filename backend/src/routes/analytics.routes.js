const express = require('express');
const router = express.Router();
const { getDeadStockReport, getFastMovingItems } = require('../controllers/analytics.controller');

router.get('/dead-stock', getDeadStockReport);
router.get('/fast-moving', getFastMovingItems);

module.exports = router;