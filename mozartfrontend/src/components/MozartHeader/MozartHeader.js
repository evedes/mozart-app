import React from 'react';
import './MozartHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import mozartSilhouette from '../../libs/imgs/mozart.png';

class MozartHeader extends React.Component{
  render() {
    return(
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="ml-3">
          MOZART 
        </div>
        <div className="mx-3 rounded">
          <img src={mozartSilhouette} height="45" width="40" alt="mozart" />
        </div>
        <div className="ml-3">
          METRICS
        </div>
        <div className="ml-auto mr-3">
          <FontAwesomeIcon icon="hamburger" style={{ color: 'white', height: '45px' }} />
        </div>

      </div>
    )
  }
}

export default MozartHeader;