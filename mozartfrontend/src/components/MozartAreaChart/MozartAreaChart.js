import React from 'react';
import _ from 'lodash';
import tinycolor from 'tinycolor2';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import MozartChartHeader from '../MozartChartHeader';
import { colors } from './constants';

import './MozartAreaChart.scss';

class MozartAreaChart extends React.Component {
  static defaultProps = {
    colors,
  }

  getLineKeys = () => {
    const { data, xKey } = this.props;
    return _.keysIn(_.first(data))
      .filter(key => key !== xKey);
  }

  getStrokeColor = color => {
    return _.toString(tinycolor(color).setAlpha(0.8));
  }

  getFillColor = color => {
    return _.toString(tinycolor(color).setAlpha(0.2));
  }

  getAxisColor = () => {
    return _.toString(tinycolor('white').setAlpha(.65));
  }
  
  getGridColor = () => {
    return _.toString(tinycolor('white').setAlpha(.15));
  }

  formatTick = (tickValue) => {
    return tickValue;
  }

  render() {
    const { data, height, colors, xKey, title } = this.props;
    const yKeys = this.getLineKeys();
    return (
      <>
      <MozartChartHeader title={title} />
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          className="MozartAreaChart"
          margin={{ top: 10, right: 10, left: -25, bottom: -10 }}>
        {
          _(yKeys).map((lineKey, i) => {
            return <Area
              key={lineKey}
              stroke={this.getStrokeColor(colors[i])}
              activeDot={{ stroke: this.getStrokeColor(colors[i]), strokeWidth: 2, opacity: 0.5 }}
              strokeWidth={1.6}
              fill={this.getFillColor(colors[i])}
              dataKey={lineKey} />
          }).value()
        }
          <XAxis
            dataKey={xKey}
            tickFormatter={(tickValue) => this.formatTick(tickValue)}
            interval={600}
            stroke={this.getAxisColor()}
            tickSize={3} />
          <YAxis type="number" stroke={this.getAxisColor()} />
          <CartesianGrid stroke={this.getGridColor()} />
          <Tooltip
            cursor={{ stroke: 'red' }}
            contentStyle={{ backgroundColor: '#161719', border: this.getGridColor() }} />
        </AreaChart>
      </ResponsiveContainer>
      </>
    )
  }
}

export default MozartAreaChart;