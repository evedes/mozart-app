import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { object, number, array, func, string } from 'prop-types';
import { withSize } from 'react-sizeme';
import { Responsive } from 'react-grid-layout';
import { changeCurrentBreakpoint } from '../../actions/currentBreakpoint.actions';
import { defaultBreakpoints, defaultCols } from './gridLayoutSettings';

import('./MozartGridLayout.scss');
import('../../../node_modules/react-resizable/css/styles.css');

class MozartGridLayout extends React.Component {
  static defaultProps = {
    defaultBreakpoints,
    defaultCols,
  };

  componentDidMount() {
    this.setInitialBreakpoint();
  }

  setInitialBreakpoint = () => {
    const {
      size: { width },
    } = this.props;
    const initialBreakpoint = _.findKey(
      defaultBreakpoints,
      item => width <= item
    );
    return this.onBreakpointChange(initialBreakpoint);
  };

  onBreakpointChange = breakpoint => {
    const { dispatch } = this.props;
    dispatch(changeCurrentBreakpoint(breakpoint));
  };

  render() {
    const {
      layouts,
      gridComponents,
      currentBreakpoint,
      size: { width },
    } = this.props;

    return (
      <div className="MozartGridLayout">
        <Responsive
          {...this.props}
          width={width}
          layouts={layouts}
          onBreakpointChange={this.onBreakpointChange}
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
  layouts: object,
  defaultBreakpoints: object,
  currentBreakpoint: string,
  onBreakpointChange: func,
  defaultCols: object,
  rowHeight: number,
  gridComponents: array,
  dispatch: func,
  size: object,
  getGridWidth: func,
};

const mapStateToProps = state => ({
  currentBreakpoint: state.currentBreakpoint,
});

export default connect(mapStateToProps)(withSize()(MozartGridLayout));
