/* eslint-disable react/no-multi-comp */
import React from 'react';
import { string, func } from 'prop-types';

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

export const withDataConnection = WrappedComponent =>
  class extends React.Component {
    static displayName = 'PollingHOC';

    static propTypes = {
      chartingPeriod: string,
      pollingPeriod: string,
      connectionMode: string,
      fetchData: func,
    };

    componentDidMount() {
      const { chartingPeriod, fetchData, connectionMode } = this.props;
      fetchData(chartingPeriod, false);
      switch (connectionMode) {
        case 'polling':
          return this.setInterval(chartingPeriod);
        default:
          return null;
      }
    }

    componentDidUpdate(prevProps) {
      const {
        chartingPeriod,
        pollingPeriod,
        connectionMode,
        fetchData,
      } = this.props;

      switch (connectionMode) {
        case 'polling':
          if (chartingPeriod !== prevProps.chartingPeriod) {
            this.resetInterval(true);
          }
          if (pollingPeriod !== prevProps.pollingPeriod) {
            this.resetInterval(true);
          }
          if (connectionMode !== prevProps.connectionMode) {
            this.resetInterval(true);
          }
          break;
        case 'streaming':
          this.clearInterval();
          if (chartingPeriod !== prevProps.chartingPeriod) {
            fetchData(chartingPeriod, false);
          }
          break;
        default:
          return null;
      }
    }

    componentWillUnmount() {
      const { connectionMode } = this.props;
      switch (connectionMode) {
        case 'polling':
          return this.clearInterval();
        default:
          return null;
      }
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
      console.log('connectionMode: ', this.props.connectionMode);
      return <WrappedComponent {...this.props} />;
    }
  };
