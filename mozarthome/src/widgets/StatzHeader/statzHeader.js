import React from 'react';
import MozartBox from '../../components/MozartBox';

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
      <MozartBox>
        <div>
          Hostname: { this.state.hostname }
        </div>
        <div>
          CPU Model: { this.state.cpuModel }
        </div>
        <div className="mt-2">
          Total System Memory: { this.state.totalMem } MB
        </div>
        <div>
          Free System Memory: { this.state.freeMem } MB
        </div>
      </MozartBox>
    )
  }
}

export default StatzHeader;