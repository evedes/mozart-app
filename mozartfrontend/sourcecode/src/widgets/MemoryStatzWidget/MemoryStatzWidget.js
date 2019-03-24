import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartAreaChart from '../../components/MozartAreaChart';

import './MemoryStatzWidget.scss';

class MemoryStatzWidget extends React.Component {
  state = {
    memoryStatz: null,
  };

  componentDidMount() {
    this.fetchMemoryStatz();
    this.memoryStatzWidgetInterval = setInterval(
      () => this.fetchMemoryStatz(),
      10 * 1000
    );
  }

  componentDidUpdate(prevProps, prevState) {
    const { chartingPeriod } = this.props;
    const { memoryStatz } = this.state;

    if (prevProps.chartingPeriod !== chartingPeriod) {
      return this.fetchMemoryStatz();
    }
    if (prevState.memoryStatz !== memoryStatz) {
      return true;
    }
  }

  fetchMemoryStatz = async () => {
    const { chartingPeriod } = this.props;
    const memoryStatz = await fetch(`api/memoryStatz/${chartingPeriod}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ memoryStatz });
  };

  componentDidUnMount() {
    clearInterval(this.memoryStatzWidgetInterval);
  }

  render() {
    const { memoryStatz } = this.state;

    if (!memoryStatz) {
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
          title="RAM Usage Widget (GB)"
          data={chartData}
          xKey="date"
          tooltipUnit="GB"
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
};

const mapStateToProps = state => ({
  chartingPeriod: state.chartingPeriod,
});

export default connect(mapStateToProps)(MemoryStatzWidget);
