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
    
    const chartData = _.slice(cpuLoadAvg, -1000).map(item => {
      return {
        ...item,
        date: moment(item.date).format("HH:mm:ss"),
      };
    });

    console.log('chartData: ', chartData);
    
    return (
      !_.isNil(chartData)
      && (
        <div>
      <MozartBox>
        <MozartAreaChart
          height={height}
          data={chartData}
          xKey="date" />
      </MozartBox>
      <MozartBox>
        <MozartAreaChart
          height={height}
          data={chartData}
          colors={['#0F447A', '#3B5B77', '#4A7E87']}
          xKey="date" />
      </MozartBox>
      <MozartBox>
        <MozartAreaChart
          height={height}
          data={chartData}
          xKey="date" />
      </MozartBox>
      <MozartBox>
        <MozartAreaChart
          height={height}
          data={chartData}
          colors={['#0F447A', '#3B5B77', '#4A7E87']}
          xKey="date" />
      </MozartBox>
      </div>
      )
    );
  }

  render() {
    return (
      <div>{this.renderSystemLoadAverage()}</div>
    );
  }
} 

export default SystemLoadAverageWidget;
