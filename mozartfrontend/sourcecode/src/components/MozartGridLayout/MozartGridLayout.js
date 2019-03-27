import React from 'react';
import _ from 'lodash';
import { object, number, array, func, string } from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';

import('./MozartGridLayout.scss');
import('../../../node_modules/react-resizable/css/styles.css');

const ResponsiveGridLayout = WidthProvider(Responsive);

class MozartGridLayout extends React.Component {
  render() {
    const {
      defaultLayouts,
      defaultBreakpoints,
      defaultCols,
      gridComponents,
      onBreakpointChange,
      currentBreakpoint,
    } = this.props;
    return (
      <div className="MozartGridLayout">
        <ResponsiveGridLayout
          {...this.props}
          layouts={defaultLayouts}
          onBreakpointChange={onBreakpointChange}
          breakpoints={defaultBreakpoints}
          cols={defaultCols}
        >
          {_(gridComponents)
            .map(item => {
              const { gridComponent: Component, key } = item;
              return (
                <div key={key}>
                  <Component currentBreakpoint={currentBreakpoint} />
                </div>
              );
            })
            .value()}
        </ResponsiveGridLayout>
      </div>
    );
  }
}

MozartGridLayout.propTypes = {
  defaultLayouts: object,
  defaultBreakpoints: object,
  currentBreakpoint: string,
  onBreakpointChange: func,
  defaultCols: object,
  rowHeight: number,
  gridComponents: array,
  dispatch: func,
};

export default MozartGridLayout;
