const _ = require('lodash');
const express = require('express')
const app = express()
require('dotenv').config();
var os = require('os');


const { PORT } = process.env;

app.get('/api/cpu', (req, res) => {
  console.log('---------- CPU Info ----------- ');
  const sysinfo = {
    cpu_model: os.cpus()[0].model,
    logical_cpus: _.size(os.cpus()),
    total_mem: Math.floor(os.totalmem() / 1024 / 1024),
    free_mem: Math.floor(os.freemem() / 1024 / 1024),
    hostname: os.hostname(),
    network_interfaces: os.networkInterfaces(),
    os_load_avg: os.loadavg(),
  }
  res.json(sysinfo);
});

app.listen(PORT, () => console.log(`mozart_backend API listening on PORT ${PORT}!`))