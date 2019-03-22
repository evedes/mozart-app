import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { string } from 'prop-types';
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
    this.systemLoadAverageWidgetInterval = setInterval(
      () => this.fetchSystemLoadAvg(),
      10 * 1000
    );
  }

  componentDidUpdate(prevProps) {
    const { chartingPeriod } = this.props;
    if (prevProps.chartingPeriod !== chartingPeriod) {
      return this.fetchSystemLoadAvg();
    }
  }

  fetchSystemLoadAvg = async () => {
    const { chartingPeriod } = this.props;
    const cpuLoadAvg = await fetch(`api/cpuLoadAvg/${chartingPeriod}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ cpuLoadAvg });
  };

  componentDidUnMount() {
    clearInterval(this.systemLoadAverageWidgetInterval);
  }

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

SystemLoadAverageWidget.propTypes = {
  chartingPeriod: string,
};

const mapStateToProps = state => ({
  chartingPeriod: state.chartingPeriod,
});

export default connect(mapStateToProps)(SystemLoadAverageWidget);
