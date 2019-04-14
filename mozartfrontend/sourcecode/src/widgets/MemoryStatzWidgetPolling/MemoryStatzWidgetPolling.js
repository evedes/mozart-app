import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withPolling } from '../../hocs';
import { pollMemoryStatz as fetchData } from './actions/loadMemoryStatz.actions';

import { blueColorScheme as colors } from '../../constants/colorSchemes';
import './MemoryStatzWidgetPolling.scss';

const MemoryStatzWidgetPolling = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="RAM Usage Widget (MB) - Fetch / Polling"
      data={data}
      xKey="date"
      tooltipUnit="MB"
      tooltipCursorColor="#3200E5"
      colors={colors}
    />
  </MozartBox>
);

MemoryStatzWidgetPolling.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, memoryStatzPolling = {} }) => ({
  pollingPeriod: global.pollingPeriod,
  chartingPeriod: global.chartingPeriod,
  changingChartingPeriod: memoryStatzPolling.changingChartingPeriod,
  data: memoryStatzPolling.data,
  isFetching: memoryStatzPolling.isFetching,
  isLoaded: memoryStatzPolling.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withPolling
)(MemoryStatzWidgetPolling);
