const aggregateById = chartingPeriod => {
  switch (chartingPeriod) {
    case '10':
    case '60':
    case '720':
      return {
        year: { $year: '$date' },
        month: { $month: '$date' },
        day: { $dayOfMonth: '$date' },
        hour: { $hour: '$date' },
        minute: { $minute: '$date' },
        second: { $second: '$date' },
      };
    default:
      return {
        year: { $year: '$date' },
        month: { $month: '$date' },
        day: { $dayOfMonth: '$date' },
        hour: { $hour: '$date' },
        minute: { $minute: '$date' },
      };
  }
};

const matchGroup = (startDate, endDate) => ({
  date: {
    $gte: startDate.toDate(),
    $lte: endDate.toDate(),
  },
});

const sortGroup = chartingPeriod => {
  switch (chartingPeriod) {
    case '10':
    case '60':
    case '720':
      return {
        '_id.hour': 1,
        '_id.minute': 1,
        '_id.second': 1,
      };
    default:
      return { '_id.hour': 1, '_id.minute': 1 };
  }
};

module.exports = {
  aggregateById,
  matchGroup,
  sortGroup,
};
