import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withWSStreams } from '../../hocs';
import { streamMemoryStatz as fetchData } from './actions/loadMemoryStatz.actions';

import { blueColorScheme as colors } from '../../constants/colorSchemes';
import './MemoryStatzWidgetWSStreaming.scss';

const MemoryStatzWidgetWSStreaming = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="RAM Usage Widget (MB) - WS Streaming"
      data={data}
      xKey="date"
      tooltipUnit="MB"
      tooltipCursorColor="#3200E5"
      colors={colors}
    />
  </MozartBox>
);

MemoryStatzWidgetWSStreaming.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, memoryStatzWSStreaming = {} }) => ({
  pollingPeriod: global.pollingPeriod,
  chartingPeriod: global.chartingPeriod,
  changingChartingPeriod: memoryStatzWSStreaming.changingChartingPeriod,
  data: memoryStatzWSStreaming.data,
  isFetching: memoryStatzWSStreaming.isFetching,
  isLoaded: memoryStatzWSStreaming.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withWSStreams
)(MemoryStatzWidgetWSStreaming);
