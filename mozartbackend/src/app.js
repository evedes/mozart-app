const express = require('express');
const routes = require('./routes/index');

const app = express();

app.use('/api', routes);

module.exports = app;
