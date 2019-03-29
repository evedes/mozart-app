const express = require('express');

const router = express.Router();
const moment = require('moment');
const os = require('os');
const si = require('systeminformation');

const _ = require('lodash');

require('../timers');
const cpuLoadAvgModel = require('../models/cpuLoadAvg');
const networkStatzModel = require('../models/networkStatz');
const memoryStatzModel = require('../models/memoryStatz');

const filterData = (doc, chartingPeriod) => {
  switch (chartingPeriod) {
    case '10':
      return doc.date.getSeconds() % 10 === 0 ? doc : null;
    case '60':
      return doc.date.getSeconds() % 20 === 0 ? doc : null;
    case '720':
      return doc.date.getSeconds() === 0 ? doc : null;
    case '1440':
      return doc.date.getSeconds() === 0 ? doc : null;
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
      const averageLoads = _(docs)
        .map(doc => {
          const { oneMin, fiveMin, fifteenMin, date } = doc;
          return {
            fifteenMin: _.round(_.toNumber(fifteenMin), 3),
            fiveMin: _.round(_.toNumber(fiveMin), 3),
            oneMin: _.round(_.toNumber(oneMin), 3),
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
      const networkStatz = _(docs)
        .map(doc => {
          const { rx_sec: rxSec, tx_sec: txSec, iface, date } = doc;
          return {
            rx_sec: _.round(-rxSec / 1024, 3),
            tx_sec: _.round(txSec / 1024, 3),
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

router.get('/memoryStatz/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  const endDate = moment();
  const startDate = moment()
    .subtract(chartingPeriod, 'minutes')
    .startOf('minute');

  await memoryStatzModel
    .find({
      date: {
        $lte: endDate,
        $gte: startDate,
      },
    })
    .exec((err, docs) => {
      const memoryStatz = _(docs)
        .map(doc => {
          const { total, free, used, date, active, available } = doc;
          return {
            available: _.round(available / 1024 / 1024, 3),
            active: _.round(active / 1024 / 1024, 3),
            used: _.round(used / 1024 / 1024, 3),
            free: _.round(free / 1024 / 1024, 3),
            total: _.round(total / 1024 / 1024, 3),
            date,
          };
        })
        .filter(doc => filterData(doc, chartingPeriod))
        .compact()
        .value();
      res.json(memoryStatz);
    });
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
