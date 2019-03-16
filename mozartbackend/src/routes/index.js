const express = require('express');

const router = express.Router();
const moment = require('moment');
const os = require('os');
const _ = require('lodash');

require('../timers');
const cpuLoadAvgModel = require('../models/cpuLoadAvg');
const networkStatzModel = require('../models/networkStatz');

router.get('/', (req, res) => {
  res.json('hello');
});

router.get('/cpuLoadAvg', async (req, res) => {
  const endDate = moment().startOf('minute');
  const startDate = moment()
    .subtract(60, 'minutes')
    .startOf('minute');

  await cpuLoadAvgModel
    .find({
      date: {
        $lte: endDate,
        $gte: startDate,
      },
    })
    .exec((err, docs) => {
      const averageLoads = _(docs)
        .map(doc => {
          const { oneMin, fiveMin, fifteenMin, date } = doc;
          return {
            oneMin: _.round(_.toNumber(oneMin), 3),
            fiveMin: _.round(_.toNumber(fiveMin), 3),
            fifteenMin: _.round(_.toNumber(fifteenMin), 3),
            date,
          };
        })
        .value();
      res.json(averageLoads);
    });
});

router.get('/networkStatz', async (req, res) => {
  console.log('req: ', req.body);
  const endDate = moment().startOf('minute');
  const startDate = moment()
    .subtract(60, 'minutes')
    .startOf('minute');

  await networkStatzModel
    .find({
      date: {
        $lte: endDate,
        $gte: startDate,
      },
    })
    .exec((err, docs) => {
      const networkStatz = _(docs)
        .map(doc => {
          const { rx_sec: rxSec, tx_sec: txSec, iface, date } = doc;
          return {
            rx_sec: -rxSec / 1024,
            tx_sec: txSec / 1024,
            iface,
            date,
          };
        })
        .value();
      res.json(networkStatz);
    });
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
