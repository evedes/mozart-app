const express = require('express');

const router = express.Router();
const moment = require('moment');
const os = require('os');
const _ = require('lodash');

require('../timers');
const cpuLoadAvgModel = require('../models/cpuLoadAvg');
const networkStatzModel = require('../models/networkStatz');

const filterData = (doc, chartingPeriod) => {
  switch (chartingPeriod) {
    case '10':
      return doc.date.getSeconds() % 10 === 0 ? doc : null;
    case '60':
      return doc.date.getSeconds() % 20 === 0 ? doc : null;
    case '720':
      return doc.date.getSeconds() === 0 ? doc : null;
    case '1440':
      return doc.date.getSeconds() === 0 && doc.date.getMinutes() % 10 === 0
        ? doc
        : null;
    default:
      return null;
  }
};

router.get('/cpuLoadAvg/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  const endDate = moment();
  const startDate = moment()
    .subtract(chartingPeriod, 'minutes')
    .startOf('minute');

  await cpuLoadAvgModel
    .find({
      date: {
        $lte: endDate,
        $gte: startDate,
      },
    })
    .exec((err, docs) => {
      console.log(`reading cpu load avg - period: ${chartingPeriod} mins ✅`);
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
        .filter(doc => filterData(doc, chartingPeriod))
        .compact()
        .value();
      res.json(averageLoads);
    });
});

router.get('/networkStatz/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  const endDate = moment();
  const startDate = moment()
    .subtract(chartingPeriod, 'minutes')
    .startOf('minute');

  await networkStatzModel
    .find({
      date: {
        $lte: endDate,
        $gte: startDate,
      },
    })
    .exec((err, docs) => {
      console.log(`reading newtwork statz - period: ${chartingPeriod} mins ✅`);
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
        .filter(doc => filterData(doc, chartingPeriod))
        .compact()
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
