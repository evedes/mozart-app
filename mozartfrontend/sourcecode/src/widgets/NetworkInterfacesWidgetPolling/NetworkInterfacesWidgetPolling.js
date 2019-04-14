import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';
import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withPolling } from '../../hocs';
import { pollNetworkStatz as fetchData } from './actions/loadNetworkStatz.actions';
import './NetworkInterfacesWidgetPolling.scss';

const NetworkInterfacesWidgetPolling = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="Network Interface Widget - RX/TX (kBytes / sec) - Fetch / Polling"
      data={data}
      xKey="date"
      tooltipUnit="kB/sec"
    />
  </MozartBox>
);

NetworkInterfacesWidgetPolling.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, networkStatzPolling = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: networkStatzPolling.changingChartingPeriod,
  data: networkStatzPolling.data,
  isFetching: networkStatzPolling.isFetching,
  isLoaded: networkStatzPolling.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withPolling
)(NetworkInterfacesWidgetPolling);
