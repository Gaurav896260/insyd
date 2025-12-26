const express = require('express');
const router = express.Router();
const { performAudit } = require('../controllers/audit.controller');

router.post('/', performAudit);

module.exports = router;