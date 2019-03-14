import React from 'react';
import './MozartHeader.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import mozartSilhouette from '../../libs/imgs/mozartfilled.png';

class MozartHeader extends React.Component{
  render() {
    return(
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="ml-3">
          <img src={mozartSilhouette}
            height="35"
            width="auto"
            alt="mozart"
          />
        </div>
        <div className="ml-3 mt-2">
          MOZART METRICS
        </div>
        <div className="ml-auto mr-3">
          <FontAwesomeIcon icon="hamburger" style={{ height: '35px' }} />
        </div>

      </div>
    )
  }
}

export default MozartHeader;