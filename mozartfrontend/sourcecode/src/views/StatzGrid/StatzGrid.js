import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { func, string } from 'prop-types';
import MozartGridLayout from '../../components/MozartGridLayout';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NetworkInterfacesWidget';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import MemoryStatzWidget from '../../widgets/MemoryStatzWidget';
import ProcessesStatzWidget from '../../widgets/ProcessesStatzWidget';
import { changeCurrentBreakpoint } from '../../actions/currentBreakpoint.actions';

import './StatzGrid.scss';

import {
  defaultLayouts,
  defaultCols,
  defaultBreakpoints,
  rowHeight,
} from './gridDefaultConfig';

const gridComponents = [
  { gridComponent: StatzHeader, key: 'StatzHeader' },
  { gridComponent: NetworkInterfacesWidget, key: 'NetworkInterfacesWidget' },
  { gridComponent: SystemLoadAverageWidget, key: 'SystemLoadAverageWidget' },
  { gridComponent: MemoryStatzWidget, key: 'MemoryStatzWidget' },
  { gridComponent: ProcessesStatzWidget, key: 'ProcessesStatzWidget' },
];

const dashboardConfig = {
  defaultLayouts,
  defaultBreakpoints,
  rowHeight,
  defaultCols,
};

class StatzGrid extends React.Component {
  state = {
    gridWidth: 0,
  };

  componentDidMount() {
    this.getInitialBreakpoint();
    console.log('defaultBreakpoints: ', defaultBreakpoints);
  }

  getInitialBreakpoint = () => {
    const { gridWidth } = this.state;
    _(defaultBreakpoints)
      .map((width, breakpoint) => {
        if (gridWidth < width) {
          return this.onBreakpointChange(breakpoint);
        }
        return null;
      })
      .compact()
      .value();
  };

  getGridWidth = gridWidth => {
    console.log('ran: ', gridWidth);
    this.setState({
      gridWidth,
    });
  };

  onBreakpointChange = breakpoint => {
    const { dispatch } = this.props;
    return dispatch(changeCurrentBreakpoint(breakpoint));
  };

  render() {
    const { currentBreakpoint } = this.props;
    return (
      <div className="StatzGrid">
        <MozartGridLayout
          {...dashboardConfig}
          gridComponents={gridComponents}
          getGridWidth={this.getGridWidth}
          currentBreakpoint={currentBreakpoint}
          onBreakpointChange={this.onBreakpointChange}
        />
      </div>
    );
  }
}

StatzGrid.propTypes = {
  dispatch: func,
  currentBreakpoint: string,
};

const mapStateToProps = state => ({
  currentBreakpoint: state.currentBreakpoint,
});

export default connect(mapStateToProps)(StatzGrid);
