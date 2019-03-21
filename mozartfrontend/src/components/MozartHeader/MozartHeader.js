import React from 'react';
import './MozartHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MozartImage from '../MozartImage';

class MozartHeader extends React.Component {
  render() {
    return (
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="ml-3">
          <MozartImage imageName="mozart-logo" height="35" />
        </div>
        <div className="ml-3 mt-2">MOZART METRICS</div>
        <div className="ml-auto mr-3">
          <FontAwesomeIcon icon="hamburger" style={{ height: '35px' }} />
        </div>
      </div>
    );
  }
}

export default MozartHeader;
