/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withPolling } from '../../hocs';
import { loadCPUSystemAverage as fetchData } from './actions/loadCPUSystemAverage.actions';

import './SystemLoadAverageWidget.scss';

const SystemLoadAverageWidget = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="System Load Average (1 min, 5 min, 15 min)"
      data={data}
      xKey="date"
    />
  </MozartBox>
);

SystemLoadAverageWidget.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, cpuSystemLoadAvg = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: cpuSystemLoadAvg.changingChartingPeriod,
  data: cpuSystemLoadAvg.data,
  isFetching: cpuSystemLoadAvg.isFetching,
  isLoaded: cpuSystemLoadAvg.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withPolling
)(SystemLoadAverageWidget);
