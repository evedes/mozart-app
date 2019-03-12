import React, { Component } from 'react';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import StatzHeader from '../../widgets/StatzHeader';
import NetworkInterfacesWidget from '../../widgets/NewtorkInterfacesWidget';

class Statz extends Component {
  render() {
    return (
      <div className="App">
        <StatzHeader />
        <SystemLoadAverageWidget height={200} width={600}/>
        <NetworkInterfacesWidget />
      </div>
    );
  }
}

export default Statz;
