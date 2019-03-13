import React from 'react';
import _ from 'lodash';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
} from 'victory';

import MozartBox from '../../components/MozartBox';
// import MozartMultiLineChart from '../../Components/MozartMultitLineChart';

class SystemLoadAverageWidget extends React.Component {
  state = {
    cpuLoadAvg: null,
  }

  componentDidMount() {
    this.fetchSystemLoadAvg();
  }

  fetchSystemLoadAvg = async () => {
    const cpuLoadAvg = await fetch('/api/cpuLoadAvg', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    }).then(res => res.json())
    return this.setState({ cpuLoadAvg });
  }

  getAxisTickStyle = () => {
    const xAxisTickStyle = {
      axis: {
        stroke: 'black',
        strokeOpacity: 0.3
      },
      ticks: {
        size: 1,
        stroke: 'black',
        strokeOpacity: 0.8
      },
      grid: {
        stroke: 'gray',
        opacity: 1,
        strokeWidth: 0.1,
        strokeDasharray: '30, 5',
      },
      tickLabels: {
        fontSize: '4px',
        fontFamily: 'inherit',
        fillOpacity: 1,
        margin: 0,
        padding: 0
      },
      axisLabel: {
        fontSize: '8px',
      }
    };

    const yAxisTickStyle = {
      axis: {
        stroke: 'black',
        strokeOpacity: 0.3
      },
      ticks: {
        size: 1,
        stroke: 'black',
        strokeOpacity: 0.8
      },
      grid: {
        stroke: 'gray',
        opacity: 1,
        strokeWidth: 0.1,
        strokeDasharray: '30, 5',
      },
      tickLabels: {
        fontSize: '4px',
        fontFamily: 'inherit',
        fillOpacity: 1,
        margin: 0,
        padding: 0
      },
      axisLabel: {
        fontSize: '8px',
      }
    };

    return { xAxisTickStyle, yAxisTickStyle };
  }

  xAxisTickFormat = (x) => {
    const hour = new Date(x).getHours();
    const minute = new Date(x).getMinutes();
    return `${hour}:${minute}`;
  }

  getYAxisDomain = () => {
    const {
      chartData1, chartData5, chartData15
    } = this.getChartData();

    const yData = _([...chartData1, ...chartData5, ...chartData15])
      .map(({y}) => y).value();

    return {
      yAxisMin: _.round(_.min(yData), 0),
      yAxisMax: _.round(_.max(yData), 0),
    }
  }

  getChartData = () => {
    const { cpuLoadAvg } = this.state;
    const chartData1 = _(cpuLoadAvg).map(({date: x, oneMin: y}) => {
      return { x, y }
    }).slice(-1*20).value();
    const chartData5 = _(cpuLoadAvg).map(({date: x, fiveMin: y}) => {
      return { x, y }
    }).slice(-1*20).value();
    const chartData15 = _(cpuLoadAvg).map(({date: x, fifteenMin: y}) => {
      return { x, y }
    }).slice(-1*20).value();
    return { chartData1, chartData5, chartData15 };
  }


  renderSystemLoadAverage = () => {
    const { height, width } = this.props;
    const {
      chartData1, chartData5, chartData15,
    } = this.getChartData();

    const {
      xAxisTickStyle, yAxisTickStyle,
    } = this.getAxisTickStyle();

    return (
      <MozartBox>
        <VictoryChart
          height={height}
          width={width}>
          <VictoryLine
            data={chartData1}
            style={{
              data: { fill: 'yellow', stroke: 'orange', strokeWidth: 0.5 },
            }}
          />
          <VictoryLine
            data={chartData5}
            style={{
              data: { fill: 'orange', stroke: 'orange', strokeWidth: 0.8  },
            }}
          />
          <VictoryLine
            data={chartData15}
            style={{
              data: { fill: 'red', stroke: 'red', strokeWidth: 1.5  },
            }}
          />
          <VictoryAxis
            label="system load avg"
            dependentAxis={true}
            style={yAxisTickStyle} />
          <VictoryAxis
            label="time (minute)"
            tickFormat={this.xAxisTickFormat}
            style={xAxisTickStyle} />
        </VictoryChart>
      </MozartBox>
    );
  }

  render() {
    return (
      <div>{this.renderSystemLoadAverage()}</div>
    );
  }
} 

export default SystemLoadAverageWidget;
