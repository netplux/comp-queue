const express = require('express');
const router = express.Router();
const { createReport, getReports } = require('../controllers/reportController');

router.post('/create', createReport);
router.get('/', getReports);

module.exports = router;
