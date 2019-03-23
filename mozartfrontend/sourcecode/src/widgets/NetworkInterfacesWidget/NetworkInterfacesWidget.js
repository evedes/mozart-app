import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';

import './NetworkInterfacesWidget.scss';

class NetworkInterfacesWidget extends React.Component {
  state = {
    networkStatz: null,
  };

  componentDidMount() {
    this.fetchNetworkStatz();
    this.networkInterfacesWidgetInterval = setInterval(
      () => this.fetchNetworkStatz(),
      10 * 1000
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { chartingPeriod } = this.props;
    const { networkStatz } = this.state;

    if (prevProps.chartingPeriod !== chartingPeriod) {
      return this.fetchNetworkStatz();
    }
    if (prevState.networkStatz !== networkStatz) {
      return true;
    }
  }

  fetchNetworkStatz = async () => {
    const { chartingPeriod } = this.props;
    const networkStatz = await fetch(`api/networkStatz/${chartingPeriod}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ networkStatz });
  };

  componentDidUnMount() {
    clearInterval(this.networkInterfacesWidgetInterval);
  }

  render() {
    const { networkStatz } = this.state;

    if (!networkStatz) {
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
          title="Network Interface Widget - RX/TX (bytes)"
          data={chartData}
          xKey="date"
        />
      </MozartBox>
    );
  }
}

NetworkInterfacesWidget.propTypes = {
  chartingPeriod: string,
};

const mapStateToProps = state => ({
  chartingPeriod: state.chartingPeriod,
});

export default connect(mapStateToProps)(NetworkInterfacesWidget);
