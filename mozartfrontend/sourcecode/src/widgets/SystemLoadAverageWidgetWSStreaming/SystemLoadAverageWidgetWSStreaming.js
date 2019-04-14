/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withWSStreams } from '../../hocs';
import { streamCPUSystemAverage as fetchData } from './actions/loadCPUSystemAverage.actions';

import './SystemLoadAverageWidgetWSStreaming.scss';

const SystemLoadAverageWidgetWSStreaming = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="System Load Average (1 min, 5 min, 15 min) - WS Streaming"
      data={data}
      xKey="date"
    />
  </MozartBox>
);

SystemLoadAverageWidgetWSStreaming.propTypes = {
  data: array,
};

const mapStateToProps = ({
  global = {},
  cpuSystemLoadAvgWSStreaming = {},
}) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: cpuSystemLoadAvgWSStreaming.changingChartingPeriod,
  data: cpuSystemLoadAvgWSStreaming.data,
  isFetching: cpuSystemLoadAvgWSStreaming.isFetching,
  isLoaded: cpuSystemLoadAvgWSStreaming.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withWSStreams
)(SystemLoadAverageWidgetWSStreaming);
