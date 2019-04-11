import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withDataConnection } from '../../hocs';
import { loadMemoryStatz as fetchData } from './actions/loadMemoryStatz.actions';

import { blueColorScheme as colors } from '../../constants/colorSchemes';
import './MemoryStatzWidget.scss';

const MemoryStatzWidget = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="RAM Usage Widget (MB)"
      data={data}
      xKey="date"
      tooltipUnit="MB"
      tooltipCursorColor="#3200E5"
      colors={colors}
    />
  </MozartBox>
);

MemoryStatzWidget.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, memoryStatz = {} }) => ({
  pollingPeriod: global.pollingPeriod,
  chartingPeriod: global.chartingPeriod,
  connectionMode: global.connectionMode,
  changingChartingPeriod: memoryStatz.changingChartingPeriod,
  data: memoryStatz.data,
  isFetching: memoryStatz.isFetching,
  isLoaded: memoryStatz.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withDataConnection
)(MemoryStatzWidget);
