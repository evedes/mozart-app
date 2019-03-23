import React from 'react';
import './MozartHeader.scss';
import MozartImage from '../MozartImage';
import MozartChartPeriodDropdown from '../MozartChartPeriodDropdown';

class MozartHeader extends React.Component {
  render() {
    return (
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="ml-3">
          <MozartImage imageName="mozart-logo" height="35" />
        </div>
        <div className="ml-3 mt-2">MOZART METRICS</div>
        <div className="ml-auto mr-3">
          <span className="mx-3">
            <MozartChartPeriodDropdown />
          </span>
        </div>
      </div>
    );
  }
}

export default MozartHeader;
