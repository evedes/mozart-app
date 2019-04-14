import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { func, string, bool } from 'prop-types';
import MozartGridLayout from '../../components/MozartGridLayout';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidgetPolling from '../../widgets/NetworkInterfacesWidgetPolling';
import NetworkInterfacesWidgetWSStreaming from '../../widgets/NetworkInterfacesWidgetWSStreaming';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import MemoryStatzWidget from '../../widgets/MemoryStatzWidget';
import ProcessesStatzWidget from '../../widgets/ProcessesStatzWidget';

import './StatzGrid.scss';

import { defaultLayouts, rowHeight } from './gridDefaultConfig';

const gridComponents = connectionMode => [
  { gridComponent: StatzHeader, key: 'StatzHeader' },
  {
    gridComponent:
      connectionMode === 'polling'
        ? NetworkInterfacesWidgetPolling
        : NetworkInterfacesWidgetWSStreaming,
    key: 'NetworkInterfacesWidget',
  },
  { gridComponent: SystemLoadAverageWidget, key: 'SystemLoadAverageWidget' },
  { gridComponent: MemoryStatzWidget, key: 'MemoryStatzWidget' },
  { gridComponent: ProcessesStatzWidget, key: 'ProcessesStatzWidget' },
];

const dashboardConfig = {
  defaultLayouts,
  rowHeight,
};

class StatzGrid extends React.Component {
  state = {
    layouts: defaultLayouts,
  };

  componentDidUpdate(prevProps) {
    const { isDashboardLocked } = this.props;
    if (prevProps.isDashboardLocked !== isDashboardLocked) {
      return this.toggleDashboardLock();
    }
  }

  toggleDashboardLock = () => {
    const { layouts } = this.state;
    return _(layouts)
      .map((items, breakpoint) =>
        _(items)
          .map((widget, key) =>
            this.setState(state => ({
              layouts: {
                ...state.layouts,
                [breakpoint]: _(state.layouts[breakpoint])
                  .map((item, itemKey) =>
                    key === itemKey
                      ? { ...widget, static: !widget.static }
                      : item
                  )
                  .value(),
              },
            }))
          )
          .value()
      )
      .value();
  };

  render() {
    const { currentBreakpoint, connectionMode } = this.props;
    const { layouts } = this.state;
    return (
      <div className="StatzGrid">
        <MozartGridLayout
          {...dashboardConfig}
          layouts={layouts}
          gridComponents={gridComponents(connectionMode)}
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
  isDashboardLocked: bool,
  connectionMode: string,
};

const mapStateToProps = ({ global = {} }) => ({
  isDashboardLocked: global.isDashboardLocked,
  connectionMode: global.connectionMode,
});

export default connect(mapStateToProps)(StatzGrid);
