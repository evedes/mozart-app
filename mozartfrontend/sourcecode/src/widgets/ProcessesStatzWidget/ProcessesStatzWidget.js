import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import MozartBox from '../../components/MozartBox';
import MozartSpinner from '../../components/MozartSpinner';

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

    if (!processesStatz) {
      return <MozartSpinner />;
    }
    const { list, ...processesInfo } = processesStatz; //eslint-disable-line
    return (
      <MozartBox>
        <div className="text-center m-1">Processes Statz</div>
        <ul className="d-flex list-inline justify-content-center">
          {_(processesInfo)
            .map((item, key) => (
              <li key={key} className="list-inline-item mx-3">
                {key}: {item}
              </li>
            ))
            .value()}
        </ul>
      </MozartBox>
    );
  }
}

const mapStateToProps = state => ({
  chartingPeriod: state.chartingPeriod,
});

export default connect(mapStateToProps)(ProcessesStatzWidget);
