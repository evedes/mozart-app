const os = require('os');
const si = require('systeminformation');
const moment = require('moment');

const CpuLoadAvgModel = require('../models/cpuLoadAvg');
const NetworkStatzModel = require('../models/networkStatz');

// MEASURE SYSTEM LOAD AVG (1min, 5min, 15min)

setInterval(() => {
  const osLoadAvg = os.loadavg();
  const cpuLoadAvg = new CpuLoadAvgModel({
    oneMin: osLoadAvg[0],
    fiveMin: osLoadAvg[1],
    fifteenMin: osLoadAvg[2],
    date: moment().startOf('second'),
  });
  cpuLoadAvg.save(function(err) {
    if (err) return console.err(err);
  });
}, 500);

// MEASURE NETWORK STATS

setInterval(() => {
  si.networkStats().then(data => {
    const networkStatz = new NetworkStatzModel({
      ...data[0],
      date: moment().startOf('second'),
    });
    networkStatz.save(function(err) {
      if (err) return console.err(err);
    });
  });
}, 500);
