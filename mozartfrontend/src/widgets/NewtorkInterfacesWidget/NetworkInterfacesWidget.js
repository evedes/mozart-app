import React from 'react';
import { number } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';

import './NetworkInterfacesWidget.scss';
import MozartAreaChart from '../../components/MozartAreaChart';

class NetworkInterfacesWidget extends React.Component {
  state = {
    networkStatz: null,
  };

  componentDidMount() {
    this.fetchNetworkStatz();
  }

  fetchNetworkStatz = async () => {
    const networkStatz = await fetch('/networkStatz', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ networkStatz });
  };

  render() {
    const { height } = this.props;
    const { networkStatz } = this.state;

    if (!networkStatz) {
      return <div>Loading...</div>;
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
          height={height}
          data={chartData}
          xKey="date"
        />
      </MozartBox>
    );
  }
}

NetworkInterfacesWidget.propTypes = {
  height: number,
};

export default NetworkInterfacesWidget;
