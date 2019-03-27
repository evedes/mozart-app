import React from 'react';
import { connect } from 'react-redux';
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

class StatzGrid extends React.Component {
  static defaultProps = {
    currentBreakpoint: 'lg',
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
          gridComponents={gridComponents}
          defaultLayouts={defaultLayouts}
          defaultCols={defaultCols}
          defaultBreakpoints={defaultBreakpoints}
          currentBreakpoint={currentBreakpoint}
          onBreakpointChange={this.onBreakpointChange}
          rowHeight={rowHeight}
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
