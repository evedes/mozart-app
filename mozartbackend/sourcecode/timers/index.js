const os = require('os');
const si = require('systeminformation');
const moment = require('moment');

const CpuLoadAvgModel = require('../models/cpuLoadAvg');
const NetworkStatzModel = require('../models/networkStatz');
const MemoryStatzModel = require('../models/memoryStatz');

const startTimers = fn => setInterval(() => fn(), 500);

const timers = () => {
  // MEASURE SYSTEM LOAD AVG (1min, 5min, 15min)

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

  // MEASURE NETWORK STATS

  si.networkStats().then(data => {
    const networkStatz = new NetworkStatzModel({
      ...data[0],
      date: moment().startOf('second'),
    });
    networkStatz.save(function(err) {
      if (err) return console.err(err);
    });
  });

  // MEASURE MEMORY STATS

  si.mem().then(data => {
    const { total, free, used, active, available } = data;
    const memoryStatz = new MemoryStatzModel({
      total,
      free,
      used,
      active,
      available,
      date: moment().startOf('second'),
    });
    memoryStatz.save(function(err) {
      if (err) return console.err(err);
    });
  });
};

startTimers(timers);
