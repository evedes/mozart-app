import React, { Component } from 'react';
import _ from 'lodash';
import './App.scss';

class App extends Component {
  state = {
    cpuModel: 'getting info...',
    hostname: 'getting hostname...',
  }

  componentDidMount() {
    return this.fetchSysInfo();
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
      cpuModel: sysInfo.cpu_model,
      freeMem: sysInfo.free_mem,
      totalMem: sysInfo.total_mem,
      hostname: sysInfo.hostname,
      networkInterfaces: sysInfo.network_interfaces,
      osLoadAvg: sysInfo.os_load_avg,
      logicalCpus: sysInfo.logical_cpus
    });
  }

  renderOSLoadAverage = () => {
    const { osLoadAvg, logicalCpus } = this.state;
    return (
      <>
        <h5>Logical CPUs: {logicalCpus}</h5>
        <div style={{ fontSize: '80%' }}>
          The load average is a measure of system activity, calculated by the operating system and expressed as a fractional number. As a rule of thumb, the load average should ideally be less than the number of logical CPUs in the system.
        </div>
        <div className="mt-2">
        { _(osLoadAvg).map(item =>{
          return (
            <div key={_.uniqueId('loadAvgItem-')}>
              { item }
            </div>
          );
          }).value()
        }
        </div>
      </>
    );
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
      <div className="App text-center">
        <div className="my-2">
          <h2>MOZART WEBSERVER</h2>
        </div>
        <div>
          CPU Model: { this.state.cpuModel }
        </div>
        <div>
          Hostname: { this.state.hostname }
        </div>
        <div className="mt-2">
          Total System Memory: { this.state.totalMem } MB
        </div>
        <div>
          Free System Memory: { this.state.freeMem } MB
        </div>
        <div className="my-3 p-3">
          <h3>OS Load Average</h3>
          { this.renderOSLoadAverage() }
        </div>
        <div className="my-3 p-3">
          <h3>Network Interfaces</h3>
          { this.renderNetworkInterfaces() }
        </div>
      </div>
    );
  }
}

export default App;
