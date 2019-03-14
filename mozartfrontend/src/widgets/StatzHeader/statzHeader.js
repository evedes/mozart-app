import React from 'react';

import MozartBox from '../../components/MozartBox';

import './StatzHeader.scss';

class StatzHeader extends React.Component{
  state = {
    cpuModel: 'getting info...',
    hostname: 'getting hostname...',
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
      cpuModel: sysInfo.cpu_model,
      freeMem: sysInfo.free_mem,
      totalMem: sysInfo.total_mem,
      hostname: sysInfo.hostname,
      osLoadAvg: sysInfo.os_load_avg,
      logicalCpus: sysInfo.logical_cpus
    });
  }


  render() {
    return (
      <div className="StatzHeader">
        <MozartBox>
          <div>
            <h3>General System Info</h3>
          </div>
          <div>
            <strong>Hostname:</strong>
            <span className="ml-2">{ this.state.hostname }</span>
          </div>
          <div className="mt-2">
            <strong>CPU Model:</strong>
            <span className="ml-2">{ this.state.cpuModel }</span>
          </div>
          <div className="mt-2">
            <strong>Total System Memory: </strong>
            <span className="ml-2">{ this.state.totalMem } MB</span>
          </div>
          <div className="mt-2">
            <strong>Free System Memory:</strong>
            <span className="ml-2">{ this.state.freeMem } MB</span>
          </div>
        </MozartBox>
      </div>
    )
  }
}

export default StatzHeader;