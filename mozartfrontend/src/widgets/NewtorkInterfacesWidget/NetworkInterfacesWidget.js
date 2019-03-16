import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';

import './NetworkInterfacesWidget.scss';
import MozartAreaChart from '../../components/MozartAreaChart';


class NetworkInterfacesWidget extends React.Component{
  state = {
    networkStatz: null,
  }

  componentDidMount() {
    this.fetchNetworkStatz();
  }

  fetchNetworkStatz = async () => {
    const networkStatz = await fetch('/api/networkStatz', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => res.json())
    return this.setState({ networkStatz });
  }

  render() {
    const { height } = this.props;
    const { networkStatz } = this.state;

    const chartData = _.slice(networkStatz, -3500).map(item => {
      const { rx_sec, tx_sec } = item;
      return {
        rx_sec,
        tx_sec,
        date: moment(item.date).format("HH:mm:ss"),
      };
    });

    return (
      <MozartBox>
        <MozartAreaChart
          title="Network Interface Widget - RX/TX (bytes)"
          height={height}
          data={chartData}
          xKey="date"
        />
      </MozartBox>
    )
  }
}

export default NetworkInterfacesWidget;