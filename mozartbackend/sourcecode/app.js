const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use('/api', routes);

app.use('/api/healthcheck', require('express-healthcheck')());

module.exports = app;
