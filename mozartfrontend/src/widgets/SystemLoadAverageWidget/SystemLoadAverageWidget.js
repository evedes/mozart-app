import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartAreaChart from '../../components/MozartAreaChart';

import './SystemLoadAverageWidget.scss';

class SystemLoadAverageWidget extends React.Component {
  state = {
    cpuLoadAvg: null,
  }

  componentDidMount() {
    this.fetchSystemLoadAvg();
  }

  fetchSystemLoadAvg = async () => {
    const cpuLoadAvg = await fetch('/api/cpuLoadAvg', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => res.json())
    return this.setState({ cpuLoadAvg });
  }

  renderSystemLoadAverage = () => {
    const { height } = this.props;
    const { cpuLoadAvg } = this.state;
    
    const chartData = _.slice(cpuLoadAvg, -3500).map(item => {
      return {
        ...item,
        date: moment(item.date).format("HH:mm:ss"),
      };
    });

    return (
      !_.isNil(chartData)
      && <MozartBox>
        <MozartAreaChart
          title="System Load Average (1 min, 5 min, 15 min)"
          data={chartData}
          height={height}
          xKey="date" />
      </MozartBox>
    );
  }

  render() {
    return (
      <div>{this.renderSystemLoadAverage()}</div>
    );
  }
} 

export default SystemLoadAverageWidget;
