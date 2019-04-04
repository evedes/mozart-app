import React from 'react';
import { connect } from 'react-redux';
import { string, func, array, bool } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';
import { loadMemoryStatz } from './actions/loadMemoryStatz.actions';
import './MemoryStatzWidget.scss';

class MemoryStatzWidget extends React.Component {
  componentDidMount() {
    const { chartingPeriod, dispatch } = this.props;
    loadMemoryStatz(chartingPeriod, false, dispatch);
    this.setInterval(chartingPeriod, dispatch);
  }

  componentDidUpdate(prevProps) {
    const { chartingPeriod, pollingPeriod } = this.props;
    if (chartingPeriod !== prevProps.chartingPeriod) {
      this.resetInterval(true);
    }
    if (pollingPeriod !== prevProps.pollingPeriod) {
      this.resetInterval(true);
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  setInterval = () => {
    const { chartingPeriod, dispatch, pollingPeriod } = this.props;
    this.chartingInterval = setInterval(
      () => loadMemoryStatz(chartingPeriod, false, dispatch),
      pollingPeriod * 1000
    );
  };

  resetInterval = changingChartingPeriod => {
    const { chartingPeriod, dispatch } = this.props;
    this.clearInterval();
    this.setInterval();
    loadMemoryStatz(chartingPeriod, changingChartingPeriod, dispatch);
  };

  clearInterval = () => {
    clearInterval(this.chartingInterval);
  };

  render() {
    const {
      memoryStatz,
      isFetching,
      isLoaded,
      changingChartingPeriod,
    } = this.props;

    if (!memoryStatz || (isFetching && !isLoaded && changingChartingPeriod)) {
      return <MozartSpinner />;
    }

    const chartData = _(memoryStatz)
      .map(item => {
        const { date, ...rest } = item;
        return {
          ...rest,
          date: moment(date).format('HH:mm:ss'),
        };
      })
      .value();

    return (
      <MozartBox>
        <MozartAreaChart
          title="RAM Usage Widget (MB)"
          data={chartData}
          xKey="date"
          tooltipUnit="MB"
          tooltipCursorColor="#3200E5"
          colors={[
            '#3200E5',
            '#3B13CE',
            '#4526B7',
            '#4F39A0',
            '#594C89',
            '#635F72',
          ]}
        />
      </MozartBox>
    );
  }
}

MemoryStatzWidget.propTypes = {
  chartingPeriod: string,
  pollingPeriod: string,
  memoryStatz: array,
  dispatch: func,
  isFetching: bool,
  isLoaded: bool,
  changingChartingPeriod: bool,
};

const mapStateToProps = ({ global = {}, memoryStatz = {} }) => ({
  pollingPeriod: global.pollingPeriod,
  chartingPeriod: global.chartingPeriod,
  changingChartingPeriod: memoryStatz.changingChartingPeriod,
  memoryStatz: memoryStatz.data,
  isFetching: memoryStatz.isFetching,
  isLoaded: memoryStatz.isLoaded,
});

export default connect(mapStateToProps)(MemoryStatzWidget);
