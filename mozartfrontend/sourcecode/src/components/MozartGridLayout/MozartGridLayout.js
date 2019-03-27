import React from 'react';
import _ from 'lodash';
import { object, number, array, func, string } from 'prop-types';
import { withSize } from 'react-sizeme';
import { Responsive } from 'react-grid-layout';

import('./MozartGridLayout.scss');
import('../../../node_modules/react-resizable/css/styles.css');

class MozartGridLayout extends React.Component {
  componentDidMount() {
    this.handleGridWidth();
  }

  handleGridWidth = () => {
    const {
      size: { width: gridWidth },
      getGridWidth,
    } = this.props;
    getGridWidth(gridWidth);
  };

  render() {
    const {
      defaultLayouts,
      defaultBreakpoints,
      defaultCols,
      gridComponents,
      onBreakpointChange,
      currentBreakpoint,
      size: { width: gridWidth },
    } = this.props;

    return (
      <div className="MozartGridLayout">
        <Responsive
          {...this.props}
          width={gridWidth}
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
        </Responsive>
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
  size: string,
  getGridWidth: func,
};

export default withSize()(MozartGridLayout);
