const express = require('express')
const app = express();
const mongoose = require('mongoose');
const _ = require('lodash');
const os = require('os');

require('dotenv').config({ path: ".env" });

const { PORT, DATABASE } = process.env;
mongoose.Promise = global.Promise;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry!');
  return mongoose.connect(DATABASE);
}

mongoose.connect(DATABASE);

mongoose.connection.on("error", err => {
  console.log(`MongoDB Connection Error: ${err}`);
  setTimeout(connectWithRetry, 5000);
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB is Connected!')
})


require('./models/cpuLoadAvg');

const cpuLoadAvgModel = require('./models/cpuLoadAvg');


setInterval(function() {
  const osLoadAvg = os.loadavg();
  const cpuLoadAvg = new cpuLoadAvgModel({
  oneMin: osLoadAvg[0],
  fiveMin: osLoadAvg[1],
  fifteenMin: osLoadAvg[2],
  date: Date.now(),
});
  cpuLoadAvg.save(function(err) {
    if (err) return console.err(err);
    console.log('----- saved cpu load avg data -----');
  })
},500)

app.get('/api/cpuLoadAvg', async (req, res) => {
  console.log('----- getting cpu load avg data -----');
  const findAll = cpuLoadAvgModel.find().exec((err, docs) => {
    res.json(docs);
  })
});

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