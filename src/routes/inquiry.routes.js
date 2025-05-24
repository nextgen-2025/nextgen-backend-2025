const express = require('express');
const router = express.Router();
const { submitInquiry } = require('../controllers/inquiry.controller');

router.post('/', submitInquiry);

module.exports = router;