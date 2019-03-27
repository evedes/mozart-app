import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';
import MozartWidgetHeader from '../../components/MozartWidgetHeader';
import './ProcessesStatzWidget.scss';

class ProcessesStatzWidget extends React.Component {
  state = {
    processesStatz: null,
  };

  componentDidMount() {
    this.fetchProcessesStatz();
    this.processesStatzWidgetInterval = setInterval(
      () => this.fetchProcessesStatz(),
      10 * 1000
    );
  }

  fetchProcessesStatz = async () => {
    const processesStatz = await fetch(`api/processesStatz`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
    return this.setState({ processesStatz });
  };

  componentDidUnMount() {
    clearInterval(this.processesStatzWidgetInterval);
  }

  render() {
    const { processesStatz } = this.state;
    const { currentBreakpoint } = this.props;

    if (!processesStatz) {
      return <MozartSpinner />;
    }

    const { list, ...processesInfo } = processesStatz; //eslint-disable-line
    const { all, running, ...rest } = processesInfo;

    switch (currentBreakpoint) {
      case 'sm':
        return (
          <div style={{ height: '100%' }} className="ProcessesStatzWidget">
            <MozartBox>
              <MozartWidgetHeader title="Processes Statz Widget" />
              <div className="my-1 d-flex justify-content-center">
                <div key="all" className="mx-3">
                  all: {all}
                </div>
                <div key="running" className="mx-3">
                  running: {running}
                </div>
              </div>
              <div className="my-1 d-flex list-inline justify-content-center">
                {_(rest)
                  .map((item, key) => (
                    <div key={key} className="list-inline-item mx-3">
                      {key}: {item}
                    </div>
                  ))
                  .value()}
              </div>
            </MozartBox>
          </div>
        );
      default:
        return (
          <div style={{ height: '100%' }} className="ProcessesStatzWidget">
            <MozartBox>
              <MozartWidgetHeader title="Processes Statz Widget" />
              <div className="my-1 d-flex list-inline justify-content-center">
                {_(processesInfo)
                  .map((item, key) => (
                    <div key={key} className="list-inline-item mx-3">
                      {key}: {item}
                    </div>
                  ))
                  .value()}
              </div>
            </MozartBox>
          </div>
        );
    }
  }
}

ProcessesStatzWidget.propTypes = {
  currentBreakpoint: string,
};

const mapStateToProps = state => ({
  chartingPeriod: state.chartingPeriod,
});

export default connect(mapStateToProps)(ProcessesStatzWidget);
