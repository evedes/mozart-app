import React from 'react';
import MozartGridLayout from '../../components/MozartGridLayout';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NetworkInterfacesWidget';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
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
