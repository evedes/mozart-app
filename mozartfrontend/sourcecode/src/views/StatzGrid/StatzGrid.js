import React from 'react';
import MozartGridLayout from '../../components/MozartGridLayout';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NetworkInterfacesWidget';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import MemoryStatzWidget from '../../widgets/MemoryStatzWidget';
import ProcessesStatzWidget from '../../widgets/ProcessesStatzWidget';
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
  render() {
    return (
      <div className="StatzGrid">
        <MozartGridLayout
          gridComponents={gridComponents}
          defaultLayouts={defaultLayouts}
          defaultCols={defaultCols}
          defaultBreakpoints={defaultBreakpoints}
          rowHeight={rowHeight}
        />
      </div>
    );
  }
}

export default StatzGrid;
