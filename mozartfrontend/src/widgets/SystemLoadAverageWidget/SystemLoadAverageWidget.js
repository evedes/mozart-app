import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';

import './SystemLoadAverageWidget.scss';

class SystemLoadAverageWidget extends React.Component {
  state = {
    cpuLoadAvg: null,
  };

  componentDidMount() {
    this.fetchSystemLoadAvg();
  }

  fetchSystemLoadAvg = async () => {
    const cpuLoadAvg = await fetch('api/cpuLoadAvg', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ cpuLoadAvg });
  };

  render() {
    const { cpuLoadAvg } = this.state;

    if (!cpuLoadAvg) {
      return <MozartSpinner />;
    }

    const chartData = _(cpuLoadAvg)
      .map(item => ({
        ...item,
        date: moment(item.date).format('HH:mm:ss'),
      }))
      .value();
    return (
      <MozartBox>
        <MozartAreaChart
          title="System Load Average (1 min, 5 min, 15 min)"
          data={chartData}
          xKey="date"
        />
      </MozartBox>
    );
  }
}

export default SystemLoadAverageWidget;
