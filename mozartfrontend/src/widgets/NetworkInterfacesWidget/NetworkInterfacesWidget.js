import React from "react";
import _ from "lodash";
import moment from "moment";

import MozartBox from "../../components/MozartBox";
import MozartSpinner from "../../components/MozartSpinner";
import MozartAreaChart from "../../components/MozartAreaChart";

import "./NetworkInterfacesWidget.scss";

class NetworkInterfacesWidget extends React.Component {
  state = {
    networkStatz: null
  };

  componentDidMount() {
    this.fetchNetworkStatz();
  }

  fetchNetworkStatz = async () => {
    const networkStatz = await fetch("/api/networkStatz", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    }).then(res => res.json());
    return this.setState({ networkStatz });
  };

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
          date: moment(date).format("HH:mm:ss")
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

export default NetworkInterfacesWidget;
