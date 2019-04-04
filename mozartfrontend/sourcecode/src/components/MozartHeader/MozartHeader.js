import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string, func, bool } from 'prop-types';
import { Button } from 'reactstrap';
import { toggleDashboardLock } from '../../actions/toggleDashboardLock.actions';
import MozartImage from '../MozartImage';
import MozartChartPeriodDropdown from '../MozartChartPeriodDropdown';
import MozartPollingPeriodDropdown from '../MozartPollingPeriodDropdown';

import './MozartHeader.scss';

class MozartHeader extends React.Component {
  getFontSize = () => {
    const { currentBreakpoint } = this.props;
    return currentBreakpoint === 'sm' ? '20px' : '35px';
  };

  getLockIcon = () => {
    const { isDashboardLocked } = this.props;
    return isDashboardLocked ? 'lock' : 'unlock';
  };

  toggleDashboardLock = () => {
    const { dispatch } = this.props;
    dispatch(toggleDashboardLock());
  };

  render() {
    const { currentBreakpoint } = this.props;
    return (
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="mx-3">
          <MozartImage imageName="mozart-logo" height="35" />
        </div>
        <div style={{ fontSize: this.getFontSize() }}>MOZART METRICS</div>
        <div className="ml-auto mr-3">
          <Button
            color="dark"
            className="lock-button"
            onClick={this.toggleDashboardLock}
          >
            <FontAwesomeIcon icon={this.getLockIcon()} />
          </Button>
        </div>
        <div className="mx-3">
          <MozartPollingPeriodDropdown currentBreakpoint={currentBreakpoint} />
        </div>
        <div className="mr-3">
          <MozartChartPeriodDropdown currentBreakpoint={currentBreakpoint} />
        </div>
      </div>
    );
  }
}

MozartHeader.propTypes = {
  currentBreakpoint: string,
  isDashboardLocked: bool,
  dispatch: func,
};

const mapStateToProps = ({ global = {} }) => ({
  currentBreakpoint: global.currentBreakpoint,
  isDashboardLocked: global.isDashboardLocked,
});

export default connect(mapStateToProps)(MozartHeader);
