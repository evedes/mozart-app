import React from 'react';
import './MozartHeader.scss';


class MozartHeader extends React.Component{
  render() {
    return(
      <div className="MozartHeader d-flex justify-content-start align-items-center">
        <div className="mx-3">
          MOZART APP
        </div>
      </div>
    )
  }
}

export default MozartHeader;