import React from 'react';
import _ from 'lodash';
import { number } from 'prop-types';
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
    const cpuLoadAvg = await fetch('/cpuLoadAvg', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ cpuLoadAvg });
  };

  renderSystemLoadAverage = () => {
    const { height } = this.props;
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
          height={height}
          xKey="date"
        />
      </MozartBox>
    );
  };

  render() {
    return <div>{this.renderSystemLoadAverage()}</div>;
  }
}

SystemLoadAverageWidget.propTypes = {
  height: number,
};

export default SystemLoadAverageWidget;
