const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { submitJobApplication } = require('../controllers/job.controller');

router.post('/submit-application', upload.single('resume'), submitJobApplication);

module.exports = router;