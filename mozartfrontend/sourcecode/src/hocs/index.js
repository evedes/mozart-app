/* eslint-disable react/no-multi-comp */
import React from 'react';
import { string, func, bool } from 'prop-types';

import MozartSpinner from '../components/MozartSpinner';

export const withLoader = WrappedComponent =>
  class extends WrappedComponent {
    render() {
      const { data, isFetching, isLoaded, changingChartingPeriod } = this.props;

      if (!data || (isFetching && !isLoaded && changingChartingPeriod)) {
        return <MozartSpinner />;
      }
      return super.render();
    }
  };

export const withWSStreams = WrappedComponent =>
  class extends React.Component {
    static displayName = 'WSStreamsHOC';

    static propTypes = {
      chartingPeriod: string,
      fetchData: func,
      changingChartingPeriod: bool,
    };

    componentDidMount() {
      const { chartingPeriod, fetchData } = this.props;
      fetchData(chartingPeriod, false);
    }

    componentDidUpdate(prevProps) {
      const { chartingPeriod, fetchData } = this.props;
      if (chartingPeriod !== prevProps.chartingPeriod) {
        fetchData(chartingPeriod, true);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export const withPolling = WrappedComponent =>
  class extends React.Component {
    static displayName = 'PollingHOC';

    static propTypes = {
      chartingPeriod: string,
      pollingPeriod: string,
      connectionMode: string,
      fetchData: func,
    };

    componentDidMount() {
      const { chartingPeriod, fetchData } = this.props;
      fetchData(chartingPeriod, false);
      return this.setInterval(chartingPeriod);
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
      return this.clearInterval();
    }

    setInterval = () => {
      const { chartingPeriod, pollingPeriod, fetchData } = this.props;
      this.chartingInterval = setInterval(
        () => fetchData(chartingPeriod, false),
        pollingPeriod * 1000
      );
    };

    resetInterval = changingChartingPeriod => {
      const { chartingPeriod, fetchData } = this.props;
      this.clearInterval();
      this.setInterval();
      fetchData(chartingPeriod, changingChartingPeriod);
    };

    clearInterval = () => {
      clearInterval(this.chartingInterval);
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
