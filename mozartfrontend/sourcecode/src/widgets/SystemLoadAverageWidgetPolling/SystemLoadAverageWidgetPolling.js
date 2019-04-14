/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withPolling } from '../../hocs';
import { pollCPUSystemAverage as fetchData } from './actions/loadCPUSystemAverage.actions';

import './SystemLoadAverageWidgetPolling.scss';

const SystemLoadAverageWidgetPolling = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="System Load Average (1 min, 5 min, 15 min) - Fetch / Polling"
      data={data}
      xKey="date"
    />
  </MozartBox>
);

SystemLoadAverageWidgetPolling.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, cpuSystemLoadAvgPolling = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: cpuSystemLoadAvgPolling.changingChartingPeriod,
  data: cpuSystemLoadAvgPolling.data,
  isFetching: cpuSystemLoadAvgPolling.isFetching,
  isLoaded: cpuSystemLoadAvgPolling.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withPolling
)(SystemLoadAverageWidgetPolling);
