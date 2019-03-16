import React, { Component } from 'react';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NewtorkInterfacesWidget';
import './Statz.scss';

class Statz extends Component {
  render() {
    return (
      <div className="Statz">
        <StatzHeader />
        <NetworkInterfacesWidget height={250} width={300} />
        <SystemLoadAverageWidget height={250} />
        <NetworkInterfacesWidget height={250} width={300} />
        <SystemLoadAverageWidget height={250} />
      </div>
    );
  }
}

export default Statz;
