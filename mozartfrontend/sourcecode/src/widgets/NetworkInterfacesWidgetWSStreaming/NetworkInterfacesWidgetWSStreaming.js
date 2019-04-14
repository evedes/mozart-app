import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';
import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withWSStreams } from '../../hocs';
import { streamNetworkStatz as fetchData } from './actions/loadNetworkStatz.actions';

import './NetworkInterfacesWidgetWSStreaming.scss';

const NetworkInterfacesWidgetWSStreaming = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="Network Interface Widget - RX/TX (kBytes / sec) - WS Streaming"
      data={data}
      xKey="date"
      tooltipUnit="kB/sec"
    />
  </MozartBox>
);

NetworkInterfacesWidgetWSStreaming.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, networkStatzWSStreaming = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: networkStatzWSStreaming.changingChartingPeriod,
  data: networkStatzWSStreaming.data,
  isFetching: networkStatzWSStreaming.isFetching,
  isLoaded: networkStatzWSStreaming.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withWSStreams
)(NetworkInterfacesWidgetWSStreaming);
