const moment = require('moment');
const _ = require('lodash');
const memoryStatzModel = require('../models/memoryStatz');
const { matchGroup } = require('../libs/chartsAggregateAux');
const { sortGroup } = require('../libs/chartsAggregateAux');
const { aggregateById } = require('../libs/chartsAggregateAux');

const getMemoryStatz = async (callback, chartingPeriod) => {
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
      callback(
        _(docs)
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
                  date: moment(id).format('HH:mm:ss'),
                };
              case '60':
                if (id.second % 5 === 0) {
                  return {
                    available: _.round(available / 1024 / 1024, 3),
                    active: _.round(active / 1024 / 1024, 3),
                    used: _.round(used / 1024 / 1024, 3),
                    free: _.round(free / 1024 / 1024, 3),
                    total: _.round(total / 1024 / 1024, 3),
                    date: moment(id).format('HH:mm:ss'),
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
                    date: moment(id).format('HH:mm:ss'),
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
                  date: moment(id).format('HH:mm:ss'),
                };
            }
          })
          .compact()
          .value()
      );
    });
};

module.exports = getMemoryStatz;
