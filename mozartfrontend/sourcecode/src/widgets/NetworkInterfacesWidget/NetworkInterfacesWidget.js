import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { array } from 'prop-types';
import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import { withLoader, withPolling } from '../../hocs';
import { loadNetworkStatz as fetchData } from './actions/loadNetworkStatz.actions';

import './NetworkInterfacesWidget.scss';

const NetworkInterfacesWidget = ({ data }) => (
  <MozartBox>
    <MozartAreaChart
      title="Network Interface Widget - RX/TX (kBytes / sec)"
      data={data}
      xKey="date"
      tooltipUnit="kB/sec"
    />
  </MozartBox>
);

NetworkInterfacesWidget.propTypes = {
  data: array,
};

const mapStateToProps = ({ global = {}, networkStatz = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  pollingPeriod: global.pollingPeriod,
  changingChartingPeriod: networkStatz.changingChartingPeriod,
  data: networkStatz.data,
  isFetching: networkStatz.isFetching,
  isLoaded: networkStatz.isLoaded,
});

export default compose(
  connect(
    mapStateToProps,
    { fetchData }
  ),
  withLoader,
  withPolling
)(NetworkInterfacesWidget);
