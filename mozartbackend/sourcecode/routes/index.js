const express = require('express');

const router = express.Router();
const moment = require('moment');
const os = require('os');
const si = require('systeminformation');

const _ = require('lodash');

require('../timers');

// MODELS
const cpuLoadAvgModel = require('../models/cpuLoadAvg');
const networkStatzModel = require('../models/networkStatz');
const memoryStatzModel = require('../models/memoryStatz');

// AGGREGATES AUX FUNCTIONS
const { matchGroup } = require('../libs/chartsAggregateAux');
const { sortGroup } = require('../libs/chartsAggregateAux');
const { aggregateById } = require('../libs/chartsAggregateAux');

// ROUTER ENDPOINTS
router.get('/cpuLoadAvg/:chartingPeriod', async (req, res) => {
  const { chartingPeriod } = req.params;
  const endDate = moment();
  const startDate = moment()
    .subtract(chartingPeriod, 'minutes')
    .startOf('minute');

  await cpuLoadAvgModel
    .aggregate([
      {
        $match: matchGroup(startDate, endDate),
      },
      {
        $group: {
          _id: aggregateById(chartingPeriod),
          fifteenMin: { $avg: '$fifteenMin' },
          fiveMin: { $avg: '$fiveMin' },
          oneMin: { $avg: '$oneMin' },
        },
      },
      {
        $sort: sortGroup(chartingPeriod),
      },
      {
        $project: {
          fifteenMin: 1,
          fiveMin: 1,
          oneMin: 1,
        },
      },
    ])
    .exec((err, docs) => {
      const averageLoads = _(docs)
        .map(doc => {
          const { _id: id, oneMin, fiveMin, fifteenMin } = doc;
          switch (chartingPeriod) {
            case '10':
              return {
                fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                fiveMin: _.round(_.toNumber(fiveMin), 3),
                oneMin: _.round(_.toNumber(oneMin), 3),
                date: moment(id).toDate(),
              };
            case '60':
              if (id.second % 5 === 0) {
                return {
                  fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                  fiveMin: _.round(_.toNumber(fiveMin), 3),
                  oneMin: _.round(_.toNumber(oneMin), 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            case '720':
              if (id.second % 15 === 0) {
                return {
                  fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                  fiveMin: _.round(_.toNumber(fiveMin), 3),
                  oneMin: _.round(_.toNumber(oneMin), 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            default:
              return {
                fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                fiveMin: _.round(_.toNumber(fiveMin), 3),
                oneMin: _.round(_.toNumber(oneMin), 3),
                date: moment(id).toDate(),
              };
          }
        })
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
    .aggregate([
      {
        $match: matchGroup(startDate, endDate),
      },
      {
        $group: {
          _id: aggregateById(chartingPeriod),
          rx_sec: { $avg: '$rx_sec' },
          tx_sec: { $avg: '$tx_sec' },
        },
      },
      {
        $sort: sortGroup(chartingPeriod),
      },
      {
        $project: {
          rx_sec: 1,
          tx_sec: 1,
          date: 1,
        },
      },
    ])
    .exec((err, docs) => {
      const networkStatz = _(docs)
        .map(doc => {
          const { _id: id, rx_sec: rxSec, tx_sec: txSec } = doc;
          switch (chartingPeriod) {
            case '10':
              return {
                rx_sec: _.round(-rxSec / 1024, 3),
                tx_sec: _.round(txSec / 1024, 3),
                date: moment(id).toDate(),
              };
            case '60':
              if (id.second % 5 === 0) {
                return {
                  rx_sec: _.round(-rxSec / 1024, 3),
                  tx_sec: _.round(txSec / 1024, 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            case '720':
              if (id.second % 15 === 0) {
                return {
                  rx_sec: _.round(-rxSec / 1024, 3),
                  tx_sec: _.round(txSec / 1024, 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            default:
              return {
                rx_sec: _.round(-rxSec / 1024, 3),
                tx_sec: _.round(txSec / 1024, 3),
                date: moment(id).toDate(),
              };
          }
        })
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
    .aggregate([
      {
        $match: matchGroup(startDate, endDate),
      },
      {
        $group: {
          _id: aggregateById(chartingPeriod),
          available: { $avg: '$available' },
          active: { $avg: '$active' },
          used: { $avg: '$used' },
          free: { $avg: '$free' },
          total: { $avg: '$total' },
        },
      },
      {
        $sort: sortGroup(chartingPeriod),
      },
      {
        $project: {
          available: 1,
          active: 1,
          used: 1,
          free: 1,
          total: 1,
          date: 1,
        },
      },
    ])
    .exec((err, docs) => {
      const memoryStatz = _(docs)
        .map(doc => {
          const { _id: id, total, free, used, active, available } = doc;
          switch (chartingPeriod) {
            case '10':
              return {
                available: _.round(available / 1024 / 1024, 3),
                active: _.round(active / 1024 / 1024, 3),
                used: _.round(used / 1024 / 1024, 3),
                free: _.round(free / 1024 / 1024, 3),
                total: _.round(total / 1024 / 1024, 3),
                date: moment(id).toDate(),
              };
            case '60':
              if (id.second % 5 === 0) {
                return {
                  available: _.round(available / 1024 / 1024, 3),
                  active: _.round(active / 1024 / 1024, 3),
                  used: _.round(used / 1024 / 1024, 3),
                  free: _.round(free / 1024 / 1024, 3),
                  total: _.round(total / 1024 / 1024, 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            case '720':
              if (id.second % 15 === 0) {
                return {
                  available: _.round(available / 1024 / 1024, 3),
                  active: _.round(active / 1024 / 1024, 3),
                  used: _.round(used / 1024 / 1024, 3),
                  free: _.round(free / 1024 / 1024, 3),
                  total: _.round(total / 1024 / 1024, 3),
                  date: moment(id).toDate(),
                };
              }
              return null;
            default:
              return {
                available: _.round(available / 1024 / 1024, 3),
                active: _.round(active / 1024 / 1024, 3),
                used: _.round(used / 1024 / 1024, 3),
                free: _.round(free / 1024 / 1024, 3),
                total: _.round(total / 1024 / 1024, 3),
                date: moment(id).toDate(),
              };
          }
        })
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
