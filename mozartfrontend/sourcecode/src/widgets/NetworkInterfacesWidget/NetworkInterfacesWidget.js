import React from 'react';
import { connect } from 'react-redux';
import { string, array, func, bool } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';

import { loadNetworkStatz } from './actions/loadNetworkStatz.actions';

import './NetworkInterfacesWidget.scss';

class NetworkInterfacesWidget extends React.Component {
  componentDidMount() {
    const { chartingPeriod, dispatch } = this.props;
    loadNetworkStatz(chartingPeriod, false, dispatch);
    this.setInterval(chartingPeriod, dispatch);
  }

  componentDidUpdate(prevProps) {
    const { chartingPeriod } = this.props;
    if (chartingPeriod !== prevProps.chartingPeriod) {
      this.resetInterval(true);
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setInterval = () => {
    const { chartingPeriod, dispatch } = this.props;
    this.chartingInterval = setInterval(
      () => loadNetworkStatz(chartingPeriod, false, dispatch),
      10 * 1000
    );
  };

  resetInterval = changingChartingPeriod => {
    const { chartingPeriod, dispatch } = this.props;
    this.clearInterval();
    this.setInterval();
    loadNetworkStatz(chartingPeriod, changingChartingPeriod, dispatch);
  };

  clearInterval = () => {
    clearInterval(this.chartingInterval);
  };

  render() {
    const {
      networkStatz,
      isFetching,
      isLoaded,
      changingChartingPeriod,
    } = this.props;

    if (!networkStatz || (isFetching && !isLoaded && changingChartingPeriod)) {
      return <MozartSpinner />;
    }

    const chartData = _(networkStatz)
      .map(item => {
        const { rx_sec: rxSec, tx_sec: txSec, date } = item;
        return {
          rxSec,
          txSec,
          date: moment(date).format('HH:mm:ss'),
        };
      })
      .value();

    return (
      <MozartBox>
        <MozartAreaChart
          title="Network Interface Widget - RX/TX (kBytes / sec)"
          data={chartData}
          xKey="date"
          tooltipUnit="kB/sec"
        />
      </MozartBox>
    );
  }
}

NetworkInterfacesWidget.propTypes = {
  chartingPeriod: string,
  networkStatz: array,
  dispatch: func,
  changingChartingPeriod: bool,
  isFetching: bool,
  isLoaded: bool,
};

const mapStateToProps = ({ global = {}, networkStatz = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  changingChartingPeriod: networkStatz.changingChartingPeriod,
  networkStatz: networkStatz.data,
  isFetching: networkStatz.isFetching,
  isLoaded: networkStatz.isLoaded,
});

export default connect(mapStateToProps)(NetworkInterfacesWidget);
