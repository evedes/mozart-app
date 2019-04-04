import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { string, func, array, bool } from 'prop-types';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';

import './SystemLoadAverageWidget.scss';
import { loadCPUSystemAverage } from './actions/loadCPUSystemAverage.actions';

class SystemLoadAverageWidget extends React.Component {
  componentDidMount() {
    const { chartingPeriod, dispatch } = this.props;
    loadCPUSystemAverage(chartingPeriod, false, dispatch);
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
      () => loadCPUSystemAverage(chartingPeriod, false, dispatch),
      5 * 1000
    );
  };

  resetInterval = changingChartingPeriod => {
    const { chartingPeriod, dispatch } = this.props;
    this.clearInterval();
    this.setInterval();
    loadCPUSystemAverage(chartingPeriod, changingChartingPeriod, dispatch);
  };

  clearInterval = () => {
    clearInterval(this.chartingInterval);
  };

  render() {
    const {
      cpuSystemLoadAvg,
      isFetching,
      isLoaded,
      changingChartingPeriod,
    } = this.props;

    if (
      !cpuSystemLoadAvg ||
      (isFetching && !isLoaded && changingChartingPeriod)
    ) {
      return <MozartSpinner />;
    }

    const chartData = _(cpuSystemLoadAvg)
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
  cpuSystemLoadAvg: array,
  dispatch: func,
  isFetching: bool,
  isLoaded: bool,
  changingChartingPeriod: bool,
};

const mapStateToProps = ({ global = {}, cpuSystemLoadAvg = {} }) => ({
  chartingPeriod: global.chartingPeriod,
  changingChartingPeriod: cpuSystemLoadAvg.changingChartingPeriod,
  cpuSystemLoadAvg: cpuSystemLoadAvg.data,
  isFetching: cpuSystemLoadAvg.isFetching,
  isLoaded: cpuSystemLoadAvg.isLoaded,
});

export default connect(mapStateToProps)(SystemLoadAverageWidget);
