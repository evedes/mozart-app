import React from 'react';
import StatzHeader from '../../widgets/StatzHeader';
import SystemLoadAverageWidget from '../../widgets/SystemLoadAverageWidget';
import NetworkInterfacesWidget from '../../widgets/NewtorkInterfacesWidget';
import './Statz.scss';

const Statz = () => (
  <div className="Statz">
    <StatzHeader />
    <NetworkInterfacesWidget height={250} width={300} />
    <SystemLoadAverageWidget height={250} />
    <NetworkInterfacesWidget height={250} width={300} />
    <SystemLoadAverageWidget height={250} />
  </div>
);

export default Statz;
