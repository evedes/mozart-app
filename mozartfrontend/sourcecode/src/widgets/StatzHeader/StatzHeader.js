import React from 'react';

import MozartBox from '../../components/MozartBox';

import './StatzHeader.scss';

class StatzHeader extends React.Component {
  state = {
    cpuModel: 'getting info...',
    hostname: 'getting hostname...',
  };

  componentDidMount() {
    this.fetchSysInfo();
  }

  fetchSysInfo = async () => {
    const sysInfo = await fetch('api/cpuInfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());

    return this.setState({
      cpuModel: sysInfo.cpu_model,
      freeMem: sysInfo.free_mem,
      totalMem: sysInfo.total_mem,
      hostname: sysInfo.hostname,
      units: sysInfo.units,
    });
  };

  render() {
    const { units, hostname, cpuModel, totalMem, freeMem } = this.state;
    return (
      <MozartBox>
        <div className="StatzHeader">
          <div>
            <strong>Hostname:</strong>
            <span className="ml-2">{hostname}</span>
          </div>
          <div className="mt-2">
            <strong>CPU Model:</strong>
            <span className="ml-2">{cpuModel}</span>
          </div>
          <div className="mt-2">
            <strong>Total System Memory: </strong>
            <span className="ml-2">
              {totalMem} {units}
            </span>
          </div>
          <div className="mt-2">
            <strong>Free System Memory:</strong>
            <span className="ml-2">
              {freeMem} {units}
            </span>
          </div>
        </div>
      </MozartBox>
    );
  }
}

export default StatzHeader;
