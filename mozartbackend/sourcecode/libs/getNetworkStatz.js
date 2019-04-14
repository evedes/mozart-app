const moment = require('moment');
const _ = require('lodash');
const networkStatzModel = require('../models/networkStatz');
const { matchGroup } = require('../libs/chartsAggregateAux');
const { sortGroup } = require('../libs/chartsAggregateAux');
const { aggregateById } = require('../libs/chartsAggregateAux');

const getNetworkStatz = async (callback, chartingPeriod) => {
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
      callback(
        _(docs)
          .map(doc => {
            const { _id: id, rx_sec: rxSec, tx_sec: txSec } = doc;
            switch (chartingPeriod) {
              case '10':
                return {
                  rxSec: _.round(-rxSec / 1024, 3),
                  txSec: _.round(txSec / 1024, 3),
                  date: moment(id).format('HH:mm:ss'),
                };
              case '60':
                if (id.second % 5 === 0) {
                  return {
                    rxSec: _.round(-rxSec / 1024, 3),
                    txSec: _.round(txSec / 1024, 3),
                    date: moment(id).format('HH:mm:ss'),
                  };
                }
                return null;
              case '720':
                if (id.second % 15 === 0) {
                  return {
                    rxSec: _.round(-rxSec / 1024, 3),
                    txSec: _.round(txSec / 1024, 3),
                    date: moment(id).format('HH:mm:ss'),
                  };
                }
                return null;
              default:
                return {
                  rxSec: _.round(-rxSec / 1024, 3),
                  txSec: _.round(txSec / 1024, 3),
                  date: moment(id).format('HH:mm:ss'),
                };
            }
          })
          .compact()
          .value()
      );
    });
};

module.exports = getNetworkStatz;
