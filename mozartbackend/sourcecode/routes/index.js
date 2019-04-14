const express = require('express');
const _ = require('lodash');

const router = express.Router();
const os = require('os');
const si = require('systeminformation');
const getNetworkStatz = require('../libs/getNetworkStatz');
const getMemoryStatz = require('../libs/getMemoryStatz');
const getCpuStatz = require('../libs/getCpuStatz');

require('../timers');

// ROUTER ENDPOINTS
router.get('/cpuLoadAvg/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  return getCpuStatz(cpuStatz => {
    res.json(cpuStatz);
  }, chartingPeriod);
});

router.get('/networkStatz/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  return getNetworkStatz(networkStatz => {
    res.json(networkStatz);
  }, chartingPeriod);
});

router.get('/memoryStatz/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  return getMemoryStatz(memoryStatz => {
    res.json(memoryStatz);
  }, chartingPeriod);
});

router.get('/processesStatz', async (req, res) => {
  await si
    .processes()
    .then(data => {
      res.json(data);
    })
    .catch(err => console.error(err));
});

router.get('/cpuInfo', (req, res) => {
  const sysinfo = {
    cpu_model: os.cpus()[0].model,
    logical_cpus: _.size(os.cpus()),
    total_mem: Math.floor(os.totalmem() / 1024 / 1024),
    free_mem: Math.floor(os.freemem() / 1024 / 1024),
    units: 'MB',
    hostname: os.hostname(),
    network_interfaces: os.networkInterfaces(),
    os_load_avg: os.loadavg(),
  };
  res.json(sysinfo);
});

module.exports = router;
