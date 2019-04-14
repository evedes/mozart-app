const moment = require('moment');
const _ = require('lodash');
const cpuLoadAvgModel = require('../models/cpuLoadAvg');

const { matchGroup } = require('../libs/chartsAggregateAux');
const { sortGroup } = require('../libs/chartsAggregateAux');
const { aggregateById } = require('../libs/chartsAggregateAux');

const getCpuStatz = async (callback, chartingPeriod) => {
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
      callback(
        _(docs)
          .map(doc => {
            const { _id: id, oneMin, fiveMin, fifteenMin } = doc;
            switch (chartingPeriod) {
              case '10':
                return {
                  fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                  fiveMin: _.round(_.toNumber(fiveMin), 3),
                  oneMin: _.round(_.toNumber(oneMin), 3),
                  date: moment(id).format('HH:mm:ss'),
                };
              case '60':
                if (id.second % 5 === 0) {
                  return {
                    fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                    fiveMin: _.round(_.toNumber(fiveMin), 3),
                    oneMin: _.round(_.toNumber(oneMin), 3),
                    date: moment(id).format('HH:mm:ss'),
                  };
                }
                return null;
              case '720':
                if (id.second % 15 === 0) {
                  return {
                    fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                    fiveMin: _.round(_.toNumber(fiveMin), 3),
                    oneMin: _.round(_.toNumber(oneMin), 3),
                    date: moment(id).format('HH:mm:ss'),
                  };
                }
                return null;
              default:
                return {
                  fifteenMin: _.round(_.toNumber(fifteenMin), 3),
                  fiveMin: _.round(_.toNumber(fiveMin), 3),
                  oneMin: _.round(_.toNumber(oneMin), 3),
                  date: moment(id).format('HH:mm:ss'),
                };
            }
          })
          .compact()
          .value()
      );
    });
};

module.exports = getCpuStatz;
