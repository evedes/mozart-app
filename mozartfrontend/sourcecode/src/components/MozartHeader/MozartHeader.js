import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import './MozartHeader.scss';
import MozartImage from '../MozartImage';
import MozartChartPeriodDropdown from '../MozartChartPeriodDropdown';

class MozartHeader extends React.Component {
  getFontSize = () => {
    const { currentBreakpoint } = this.props;
    return currentBreakpoint === 'sm' ? '20px' : '35px';
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
          <span className="mx-3">
            <MozartChartPeriodDropdown currentBreakpoint={currentBreakpoint} />
          </span>
        </div>
      </div>
    );
  }
}

MozartHeader.propTypes = {
  currentBreakpoint: string,
};

const mapStateToProps = state => ({
  currentBreakpoint: state.currentBreakpoint,
});

export default connect(mapStateToProps)(MozartHeader);
