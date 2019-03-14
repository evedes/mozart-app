import React from 'react';
import _ from 'lodash';

import MozartBox from '../../components/MozartBox';

import './NetworkInterfacesWidget.scss';


class NetworkInterfacesWidget extends React.Component{
  state = {
    networkInterfaces: null,
  }
  
  componentDidMount() {
    this.fetchSysInfo();
  }

  fetchSysInfo = async () => {
    const sysInfo = await fetch('/api/cpu', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())

    return this.setState({
      networkInterfaces: sysInfo.network_interfaces,
    });
  }
  renderNetworkInterfaces = () => {
    const { networkInterfaces } = this.state;
    return _(networkInterfaces).map((interfaceData, interfaceId) => {
      return (
        <span key={_.uniqueId('interface-')} className="text-danger">{ interfaceId }{" "}</span>
      );
    }).value();
  }

  render() {
    return (
      <MozartBox>
        <h3>Network Interfaces</h3>
        { this.renderNetworkInterfaces() }
      </MozartBox>
    )
  }
}

export default NetworkInterfacesWidget;