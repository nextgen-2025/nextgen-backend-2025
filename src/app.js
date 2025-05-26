require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/job.routes');
const inquiryRoutes = require('./routes/inquiry.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/jobs', jobRoutes);
app.use('/api/inquiry', inquiryRoutes);

module.exports = app;