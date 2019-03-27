import React from 'react';
import { func, string } from 'prop-types';
import MozartGridLayout from '../../components/MozartGridLayout';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NetworkInterfacesWidget';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import MemoryStatzWidget from '../../widgets/MemoryStatzWidget';
import ProcessesStatzWidget from '../../widgets/ProcessesStatzWidget';

import './StatzGrid.scss';

import { defaultLayouts, rowHeight } from './gridDefaultConfig';

const gridComponents = [
  { gridComponent: StatzHeader, key: 'StatzHeader' },
  { gridComponent: NetworkInterfacesWidget, key: 'NetworkInterfacesWidget' },
  { gridComponent: SystemLoadAverageWidget, key: 'SystemLoadAverageWidget' },
  { gridComponent: MemoryStatzWidget, key: 'MemoryStatzWidget' },
  { gridComponent: ProcessesStatzWidget, key: 'ProcessesStatzWidget' },
];

const dashboardConfig = {
  defaultLayouts,
  rowHeight,
};

class StatzGrid extends React.Component {
  render() {
    const { currentBreakpoint } = this.props;
    return (
      <div className="StatzGrid">
        <MozartGridLayout
          {...dashboardConfig}
          gridComponents={gridComponents}
          getGridWidth={this.getGridWidth}
          currentBreakpoint={currentBreakpoint}
        />
      </div>
    );
  }
}

StatzGrid.propTypes = {
  dispatch: func,
  currentBreakpoint: string,
};

export default StatzGrid;
